import { authService } from '../services/authService';
import { AuthView } from '../views/authView';

class AuthController {
  private _isLoginForm: boolean = true;

  init() {
    this.render();
    this.bindAuthEvents();
  }

  render() {
    const authContainer = document.getElementById('auth-container');
    if (authContainer) {
      const user = authService.getCurrentUser();
      authContainer.innerHTML = user 
        ? AuthView.renderProfile(user.email)
        : AuthView.renderAuthForm(this._isLoginForm);
    }
  }

  bindAuthEvents() {
    // Use event delegation for dynamically created elements
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      if (target.id === 'login-btn') {
        this._isLoginForm = true;
        this.render();
      } else if (target.id === 'register-btn') {
        this._isLoginForm = false;
        this.render();
      } else if (target.id === 'logout-btn') {
        authService.logout();
        this._isLoginForm = true; // Reset to login form after logout
        this.render();
      } else if (target.id === 'toggle-auth') {
        this._isLoginForm = !this._isLoginForm;
        this.render();
      }
    });

    document.addEventListener('submit', async (e) => {
      const form = e.target as HTMLFormElement;
      if (form.id === 'auth-form') {
        e.preventDefault();
        await this.handleAuthFormSubmit();
      }
    });
  }

  async handleAuthFormSubmit() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const errorElement = document.getElementById('auth-error');

    if (!emailInput || !passwordInput || !errorElement) return;

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      if (this._isLoginForm) {
        await authService.login(email, password);
      } else {
        await authService.register(email, password);
      }
      this.render();
    } catch (error) {
      errorElement.textContent = (error as Error).message;
    }
  }
}

export const authController = new AuthController();