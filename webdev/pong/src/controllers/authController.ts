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
      authContainer.innerHTML = AuthView.render();
    }
  }

  bindAuthEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      if (target.id === 'login-btn') {
        this.renderAuthForm(true);
      } else if (target.id === 'register-btn') {
        this.renderAuthForm(false);
      } else if (target.id === 'logout-btn') {
        authService.logout();
        this.render();
      } else if (target.id === 'toggle-auth') {
        this.toggleAuthForm();
      }
    });

    document.addEventListener('submit', async (e) => {
      if ((e.target as HTMLElement).id === 'auth-form') {
        e.preventDefault();
        await this.handleAuthFormSubmit();
      }
    });
  }

  renderAuthForm(isLogin: boolean) {
    this._isLoginForm = isLogin;
    const container = document.getElementById('auth-container');
    if (container) {
      container.innerHTML = AuthView.renderAuthForm(isLogin);
    }
  }

  toggleAuthForm() {
    this._isLoginForm = !this._isLoginForm;
    this.renderAuthForm(this._isLoginForm);
  }

  async handleAuthFormSubmit() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const isLogin = this._isLoginForm; // Use the tracked state instead of DOM inspection

    try {
      if (isLogin) {
        await authService.login(email, password);
      } else {
        await authService.register(email, password);
      }
      this.render();
    } catch (error) {
      const errorEl = document.getElementById('auth-error');
      if (errorEl) errorEl.textContent = (error as Error).message;
    }
  }
}

// Export as singleton instance
export const authController = new AuthController();