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

      if (!loginResponse.ok || loginData.success === false) {
        showLoginError(loginData.error || "Login failed");
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

/* console.log('Container State:', {
  outerHTML: twofaContainer.outerHTML,
  children: twofaContainer.children.length,
  querySelector: twofaContainer.querySelector('*'),
  childNodes: Array.from(twofaContainer.childNodes).map(node => ({
    type: node.nodeType,
    name: node.nodeName,
    content: node.nodeValue?.trim()
  }))
}); 
*/
          if (twofaContainer.querySelector('*') === null) {
	
			console.log('Attempting TwoFAController creation');

          const controller = new TwoFAController(
		    loginData.mail,
		    'login',
		    async () => { 
		      console.log('2FA Success callback triggered');
		  		  
		      loginForm.classList.add('hidden');
		      twofaContainer.classList.add('hidden');
		      handleSuccessfulLogin(loginData.login, loginData.userId);
		    },
		    twofaContainer,
      		(message, isFinal) => {
				  console.log(`2FA Error: ${message}`, isFinal);
                  showErrorPopup(message);
                  if (isFinal) {
					document.cookie = 'auth_phase=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    				document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    sessionStorage.setItem('loginError', message);
                    (document.getElementById('password') as HTMLInputElement).value = '';
                    if (loginForm) loginForm.classList.remove('hidden');
                    if (twofaContainer) twofaContainer.classList.add('hidden');
                  }
                }
              );
			  // DEBUG: Verify controller creation
 			  console.log('Controller instance:', controller);
			  		 
 			  const view = controller.init();
 			  console.log('View content:', view.outerHTML); // Check HTML exists
			  		 
 			  twofaContainer.appendChild(view);
 			  console.log('Container after append:', twofaContainer.innerHTML); // Verify insertionsole.log('Controller instance init:');

          }
        }
      } else {
        handleSuccessfulLogin(login, loginData.userId);
      }
    } catch (error) {
      showLoginError("Network error during login");
      console.error("Login error:", error);
    } finally {
      submitBtn.disabled = false;
    }
  });
}

async function handleSuccessfulLogin(username: string, userId: string): Promise<void> {
  try {
    // 1. Generate token (works for both 2FA and non-2FA flows)
    const tokenRes = await fetch('/api/auth/generate-token', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });

    if (!tokenRes.ok) {
      throw new Error('Token generation failed');
    }

    // 2. Store username and fetch user info
    localStorage.setItem('login', username);
    
    //const userInfoRes = await fetch('/api/auth/info', { credentials: 'include' });
    //if (!userInfoRes.ok) throw new Error("Failed to get user info");

    // 3. Navigate to home
    Router.navigate('home');
    showSuccessPopup("You are logged in");

  } catch (error) {
    console.error("Login completion error:", error);
    showErrorPopup("Login complete but couldn't load session");
    Router.navigate('home');
  }
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
