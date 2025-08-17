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

    if (!login) {
      showRegError("Username is required");
      return;
    }
    if (!mail) {
      showRegError("Email is required");
      return;
    }
	  // --- Email format check ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      showRegError("Please enter a valid email address");
      return;
    }
    if (!password) {
      showRegError("Password is required");
      return;
    }
    if (!confirmPassword) {
      showRegError("Please confirm your password");
      return;
    }	
    if (password !== confirmPassword) {
      showRegError("Passwords do not match");
      return;
    }
/*
    // --- Password rules ---
    // Example: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      showRegError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character");
      return;
    }
*/
    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, mail }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        showRegError(data.error || "Registration failed");
        return;
      }

	  
      if (data.requires2FA) {
		const registerForm = document.getElementById("registerForm");
        const twoFaContainer = document.getElementById("twofa-container");

		console.log('Pre-Check:', {
  		  regFormExists: !!registerForm,
  		  twofaContainerExists: !!twoFaContainer,
  		  regData: data
  		});

		if (!registerForm || !twoFaContainer) {
			showErrorPopup(data.error || "Registration form problem");
        	return;
		}
        registerForm.classList.add('hidden');
        twoFaContainer.classList.remove('hidden');

        if (twoFaContainer.querySelector('*') === null) {

          const controller = new TwoFAController(
            mail,
            'register',
            async () => {
              registerForm.classList.add('hidden');
              twoFaContainer.classList.add('hidden');
              handleSuccessfulRegistration(login, password);
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
        handleSuccessfulRegistration(login, password);
      }

    } catch (error) {
      showErrorPopup("Network error during registration");
      console.error("Registration error:", error);
    } finally {
      submitBtn.disabled = false;
    }
  });
}

async function handleSuccessfulRegistration(login: string, password: string): Promise<void> {
  try {
    const tokenRes = await fetch('/api/auth/register-end', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (!tokenRes.ok) throw new Error('Token generation failed');

    localStorage.setItem('login', login);
    showSuccessPopup("Account created successfully");
    Router.navigate('home');
  } catch (error) {
    console.error("Registration completion error:", error);
    showErrorPopup("Account created but session could not be loaded");
    Router.navigate('home');
  }
}

function showRegError(message: string): void {
  let errorMsg = document.getElementById("registrationMsg");
  if (!errorMsg) {
    errorMsg = document.createElement("p");
    errorMsg.id = "registrationMsg";
    errorMsg.classList.add("text-red-500", "px-1", "py-1", "text-xl");
    const submitBtn = document.getElementById("createAccountBtn");
    if (submitBtn && submitBtn.parentNode) {
      submitBtn.insertAdjacentElement("afterend", errorMsg);
    }
  }
  errorMsg.textContent = message;
}
