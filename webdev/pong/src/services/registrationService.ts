import { Router } from '../router';
import { showSuccessPopup, showErrorPopup } from '../utils/utils';
import { TwoFAController } from '../controllers/twofaController';

export async function initRegistration() {
  console.log('1 - Registration service initialized');

  const status = await fetch('/api/auth/me/status', { credentials: 'include' })
    .then(res => res.json());
  
  if (status.authenticated) {
    Router.navigate('home');
    showErrorPopup("You are already connected. You can't access the register page.", "popup");
    return;
  }

	const anonymizedCheckbox = document.getElementById('anonymizedCheckbox') as HTMLInputElement;
	let anonymisationEnabled = false;
	anonymizedCheckbox.addEventListener('change', () => {
		anonymisationEnabled = anonymizedCheckbox.checked;
		console.log("Anonymisation enabled:", anonymisationEnabled);
	});
  const submitBtn = document.getElementById("createAccountBtn") as HTMLButtonElement;
  submitBtn.addEventListener("click", async () => {
    const login = (document.getElementById("newUsername") as HTMLInputElement).value.trim();
    const mail = (document.getElementById("newMail") as HTMLInputElement).value;
    const password = (document.getElementById("newPassword") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    if (!login) {
      showErrorPopup("Username is required", "popup");
      return;
    }
    if (!mail) {
      showErrorPopup("Email is required", "popup");
      return;
    }
	  // --- Email format check ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      showErrorPopup("Please enter a valid email address", "popup");
      return;
    }
    if (!password) {
      showErrorPopup("Password is required", "popup");
      return;
    }
    if (!confirmPassword) {
      showErrorPopup("Please confirm your password", "popup");
      return;
    }	
    if (password !== confirmPassword) {
      showErrorPopup("Passwords do not match", "popup");
      return;
    }

	if (login.length > 40 || password.length > 40 || mail.length > 40)
	{
	  showErrorPopup("Inputs should contain no more than 40 caracters", "popup");
      return;
    }
/*
    // --- Password rules ---
    // Example: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      showErrorPopup("Password must be at least 8 characters, include uppercase, "popup", lowercase, number, and special character");
      return;
    }
*/
    submitBtn.disabled = true;
	console.log(`in initRegistrationService => anonymisationEnabled = ${anonymisationEnabled}`);

    try {
      const response = await fetch('/api/auth/users/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, mail, anonymisationEnabled }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        showErrorPopup(data.error || "Registration failed", "popup");
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
			showErrorPopup(data.error || "Registration form problem", "popup");
        	return;
		}
        registerForm.classList.add('hidden');
        twoFaContainer.classList.remove('hidden');

        if (twoFaContainer.querySelector('*') === null) {

          const controller = new TwoFAController(
            mail,
            // 'register',
            async () => {
              registerForm.classList.add('hidden');
              twoFaContainer.classList.add('hidden');
              handleSuccessfulRegistration(login, password, anonymisationEnabled);
            },
            twoFaContainer,
            (message, isFinal) => {
              showErrorPopup(message,"popup");
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
        handleSuccessfulRegistration(login, password, anonymisationEnabled);
      }

    } catch (error) {
      showErrorPopup("Network error during registration", "popup");
      console.error("Registration error:", error);
    } finally {
      submitBtn.disabled = false;
    }
  });
}

async function handleSuccessfulRegistration(login: string, password: string, anonymisationEnabled: boolean): Promise<void> {
  try {
    const tokenRes = await fetch('/api/auth/users', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, anonymisationEnabled })
    });

    if (!tokenRes.ok) throw new Error('Token generation failed');

    localStorage.setItem('login', login);
    showSuccessPopup("Account created successfully", 3500, "popup");
    Router.navigate('login');
  } catch (error) {
    console.error("Registration completion error:", error);
    showErrorPopup("Account created but session could not be loaded", "popup");
    Router.navigate('home');
  }
}