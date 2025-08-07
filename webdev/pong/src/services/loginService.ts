import { Router } from '../router';
import { showSuccessPopup, showErrorPopup } from '../utils/utils';
import { TwoFAController } from '../controllers/twofaController';

export async function initLogin() {
  console.log('1 - Login service initialized'); // Basic log

  const status = await fetch('/api/auth/status', { credentials: 'include' })
    .then(res => res.json());
  
  if (status.authenticated) {
    Router.navigate('home');
    showErrorPopup("You are already connected. You can't access the login page.");
    return;
  }

  const submitBtn = document.getElementById("connectionBtn") as HTMLButtonElement;
  submitBtn.addEventListener("click", async () => {
    const login = (document.getElementById("login") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    submitBtn.disabled = true;

    try {
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
        credentials: 'include'
      });

      const loginData = await loginResponse.json();

	  console.log('login info:', {
  		  loginData: loginData
  	  });

      if (!loginResponse.ok) {
        showLoginError(loginData.message || "Login failed");
        return;
      }

      if (loginData.requires2FA) {
        const loginForm = document.getElementById("loginCredentials");
        const twofaContainer = document.getElementById("twofa-container");
 
		console.log('Pre-Check:', {
  		  loginFormExists: !!loginForm,
  		  twofaContainerExists: !!twofaContainer,
  		  loginData: loginData
  		});

        if (loginForm && twofaContainer) {
          loginForm.classList.add('hidden');
          twofaContainer.classList.remove('hidden');
console.log('Container State:', {
  outerHTML: twofaContainer.outerHTML,
  children: twofaContainer.children.length,
  querySelector: twofaContainer.querySelector('*'),
  childNodes: Array.from(twofaContainer.childNodes).map(node => ({
    type: node.nodeType,
    name: node.nodeName,
    content: node.nodeValue?.trim()
  }))
}); 
          if (twofaContainer.querySelector('*') === null) {
	
			console.log('Attempting TwoFAController creation');

            twofaContainer.appendChild(
              new TwoFAController(
                loginData.mail,
                'login',
                loginData.token,
                () => {
			      console.log('2FA Success callback triggered');
                  loginForm.classList.add('hidden');
                  twofaContainer.classList.add('hidden');
                  handleSuccessfulLogin(loginData.login);
                },
                twofaContainer,
                (message, isFinal) => {
				  console.log(`2FA Error: ${message}`, isFinal);
                  showErrorPopup(message);
                  if (isFinal) {
                    sessionStorage.setItem('loginError', message);
                    fetch('/api/auth/invalidate', {
                      method: 'POST',
                      credentials: 'include'
                    }).finally(() => {
                      (document.getElementById('password') as HTMLInputElement).value = '';
                      loginForm.classList.remove('hidden');
                      twofaContainer.classList.add('hidden');
                    });
                  }
                }
              ).init()
            );
			console.log('Controller instance init:');

          }
        }
      } else {
        handleSuccessfulLogin(login);
      }
    } catch (error) {
      showLoginError("Network error during login");
      console.error("Login error:", error);
    } finally {
      submitBtn.disabled = false;
    }
  });
}

function handleSuccessfulLogin(username: string): void {
  localStorage.setItem('login', username);
  
  fetch('/api/auth/info', { credentials: 'include' })
    .then(res => {
      if (res.ok) {
        return fetch('/api/auth/infoUser', { credentials: 'include' });
      }
      throw new Error("Failed to get user info");
    })
    .then(() => {
      Router.navigate('home');
      showSuccessPopup("You are logged in");
    })
    .catch(error => {
      console.error("User info error:", error);
      showErrorPopup("Login complete but couldn't load user data");
      Router.navigate('home');
    });
}

function showLoginError(message: string): void {
  let errorMsg = document.getElementById("connectionMsg");
  if (!errorMsg) {
    errorMsg = document.createElement("p");
    errorMsg.id = "connectionMsg";
    errorMsg.classList.add("text-white", "px-1", "py-1", "text-xl");
    const connectionBtn = document.getElementById("connectionBtn");
    if (connectionBtn) {
      connectionBtn.insertAdjacentElement("afterend", errorMsg);
    }
  }
  errorMsg.textContent = message;
}
