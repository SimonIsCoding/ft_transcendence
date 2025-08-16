import { Router } from '../router';
import { showSuccessPopup, showErrorPopup } from '../utils/utils';
import { TwoFAController } from '../controllers/twofaController';

export async function initRegistration() {
  console.log('1 - Registration service initialized');

  const submitBtn = document.getElementById("createAccountBtn") as HTMLButtonElement;
  submitBtn.addEventListener("click", async () => {
    const username = (document.getElementById("newUsername") as HTMLInputElement).value;
    const email = (document.getElementById("newMail") as HTMLInputElement).value;
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
        body: JSON.stringify({ username, email, password }),
        credentials: 'include'
      });

      const data = await response.json();
      console.log('register response:', data);

      if (!response.ok || data.success === false) {
        showErrorPopup(data.error || "Registration failed");
        return;
      }

      const registerForm = document.getElementById("registerForm");
      const twoFaContainer = document.getElementById("twoFaContainer");

      if (data.requires2FA && registerForm && twoFaContainer) {
        registerForm.classList.add('hidden');
        twoFaContainer.classList.remove('hidden');

        if (twoFaContainer.querySelector('*') === null) {
          const controller = new TwoFAController(
            data.mail,
            'register',
            async () => {
              registerForm.classList.add('hidden');
              twoFaContainer.classList.add('hidden');
              handleSuccessfulRegistration(username, data.userId);
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
        handleSuccessfulRegistration(username, data.userId);
      }

    } catch (error) {
      showErrorPopup("Network error during registration");
      console.error("Registration error:", error);
    } finally {
      submitBtn.disabled = false;
    }
  });
}

async function handleSuccessfulRegistration(username: string, userId: string): Promise<void> {
  try {
    const tokenRes = await fetch('/api/auth/register-end', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });

    if (!tokenRes.ok) throw new Error('Token generation failed');

    localStorage.setItem('login', username);
    Router.navigate('home');
    showSuccessPopup("Account created successfully");
  } catch (error) {
    console.error("Registration completion error:", error);
    showErrorPopup("Account created but session could not be loaded");
    Router.navigate('home');
  }
}
