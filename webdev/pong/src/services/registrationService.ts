import { Router } from '../router';
import { showSuccessPopup, showErrorPopup } from '../utils/utils';
import { TwoFAController } from '../controllers/twofaController';

export async function initRegistration() {
  console.log('1 - Registration service initialized');

  const status = await fetch('/api/auth/status', { credentials: 'include' })
    .then(res => res.json());
  
  if (status.authenticated) {
    Router.navigate('home');
    showErrorPopup("You are already connected. You can't access the register page.");
    return;
  }

  const submitBtn = document.getElementById("createAccountBtn") as HTMLButtonElement;
  submitBtn.addEventListener("click", async () => {
    const login = (document.getElementById("newUsername") as HTMLInputElement).value;
    const mail = (document.getElementById("newMail") as HTMLInputElement).value;
    const password = (document.getElementById("newPassword") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      showErrorPopup("Passwords do not match");
      return;
    }

    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, mail, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        showErrorPopup(data.error || "Registration failed");
        return;
      }

	  
      if (data.requires2FA) {
		const registerForm = document.getElementById("registerForm");
		const twoFaContainer = document.getElementById("twoFaContainer");

		console.log('Pre-Check:', {
  		  loginFormExists: !!registerForm,
  		  twofaContainerExists: !!twoFaContainer,
  		  loginData: data
  		});

		if (!registerForm || !twoFaContainer) {
			showErrorPopup(data.error || "Registration form problem");
        	return;
		}
        registerForm.classList.add('hidden');
        twoFaContainer.classList.remove('hidden');

        if (twoFaContainer.querySelector('*') === null) {

			console.log('Attempting TwoFAController creation');

          const controller = new TwoFAController(
            mail,
            'register',
            async () => {
              registerForm.classList.add('hidden');
              twoFaContainer.classList.add('hidden');
              handleSuccessfulRegistration(login);
            },
            twoFaContainer,
            (message, isFinal) => {
              showErrorPopup(message);
              if (isFinal) {
                document.cookie = 'auth_phase=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                sessionStorage.setItem('registerError', message);
                (document.getElementById('newPassword') as HTMLInputElement).value = '';
                if (registerForm) registerForm.classList.remove('hidden');
                if (twoFaContainer) twoFaContainer.classList.add('hidden');
              }
            }
          );

          const view = controller.init();
          twoFaContainer.appendChild(view);
        }
      } else {
        handleSuccessfulRegistration(login);
      }

    } catch (error) {
      showErrorPopup("Network error during registration");
      console.error("Registration error:", error);
    } finally {
      submitBtn.disabled = false;
    }
  });
}

async function handleSuccessfulRegistration(login: string): Promise<void> {
  try {
    const tokenRes = await fetch('/api/auth/register-end', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login })
    });

    if (!tokenRes.ok) throw new Error('Token generation failed');

    localStorage.setItem('login', login);
    Router.navigate('home');
    showSuccessPopup("Account created successfully");
  } catch (error) {
    console.error("Registration completion error:", error);
    showErrorPopup("Account created but session could not be loaded");
    Router.navigate('home');
  }
}
