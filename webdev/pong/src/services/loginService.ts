import { Router } from '../router';
import { showSuccessPopup, showErrorPopup } from '../utils/utils';
import { TwoFAController } from '../controllers/twofaController';
import { enviarLogALogstash } from '../utils/logstash';

export async function initLogin()
{
  const status = await fetch('/api/auth/me/status', { credentials: 'include' })
    .then(res => res.json());
  
  if (status.authenticated) {
    Router.navigate('home');
    showErrorPopup("You are already connected. You can't access the login page.", "popup");
    return;
  }

  const submitBtn = document.getElementById("connectionBtn") as HTMLButtonElement;
  submitBtn.addEventListener("click", async () => {
    const login = (document.getElementById("login") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;
    submitBtn.disabled = true;

    try {
      const loginResponse = await fetch('/api/auth/users/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
        credentials: 'include'
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok || loginData.success === false) {
        showErrorPopup(loginData.error || "Login failed", "popup");
        return;
      }

      if (loginData.requires2FA) {
        const loginForm = document.getElementById("loginCredentials");
        const twofaContainer = document.getElementById("twofa-container");


        if (loginForm && twofaContainer) {
		  twofaContainer.innerHTML='';
          loginForm.classList.add('hidden');
          twofaContainer.classList.remove('hidden');

          if (twofaContainer.querySelector('*') === null) {
	
          const controller = new TwoFAController(
		    loginData.mail,
		    // 'login',
		    async () => { 
		  		  
		      loginForm.classList.add('hidden');
		      twofaContainer.classList.add('hidden');
		      handleSuccessfulLogin(loginData.login, loginData.userId);
		    },
		    twofaContainer,
      		(message, isFinal) => {
                  showErrorPopup(message, "popup");
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
			  		 
 			  const view = controller.init();
			  		 
 			  twofaContainer.appendChild(view);
          }
        }
      } else {
        handleSuccessfulLogin(login, loginData.userId);
      }
    } catch (error) {
      showErrorPopup("Network error during login", "popup");
    } finally {
      submitBtn.disabled = false;
    }
  });
}

export async function handleSuccessfulLogin(username: string, userId: string): Promise<void> {
  try {
    // 1. Generate token (works for both 2FA and non-2FA flows)
    const tokenRes = await fetch('/api/auth/users/sessions', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });

    if (!tokenRes.ok) {
      throw new Error('Token generation failed');
    }

    // 2. Store username and fetch user info
    // localStorage.setItem('login', username);

    // 3. Navigate to home
	enviarLogALogstash('login_initiated', {
			login_id: 'login-' + Date.now(),
			player_username: username,
		});
    Router.navigate('home');
    showSuccessPopup("You are logged in", 3500, "popup");

  } catch (error) {
    showErrorPopup("Login complete but couldn't load session", "popup");
    Router.navigate('home');
  }
}