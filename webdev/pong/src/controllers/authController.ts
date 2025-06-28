import { authService } from '../services/authService';
import { AuthView } from '../views/authView';

class AuthController {
  private isLoginView: boolean = true;

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
        : AuthView.renderAuthForm(this.isLoginView);
    }
  }

  bindAuthEvents() {
    // Use event delegation for dynamically created elements
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      if (target.id === 'login-btn') {
        this.isLoginView = true;
        this.render();
      } else if (target.id === 'register-btn') {
        this.isLoginView = false;
        this.render();
      } else if (target.id === 'logout-btn') {
        authService.logout();
        this.isLoginView = true; // Reset to login form after logout
        this.render();
      } else if (target.id === 'toggle-auth') {
        this.toggleAuthForms();
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
      if (this.isLoginView) {
        await authService.login(email, password);
      } else {
        await authService.register(email, password);
      }
      this.render();
    } catch (error) {
      errorElement.textContent = (error as Error).message;
    }
  }

  showLoginForm() {
    this.isLoginView = true;
    this.renderAuthForm();
  }

  showRegisterForm() {
    this.isLoginView = false;
    this.renderAuthForm();
  }

  toggleAuthForms() {
    this.isLoginView = !this.isLoginView;
    this.renderAuthForm();
  }

  renderAuthForm() {
    const container = document.getElementById('auth-container');
    if (container) {
      container.innerHTML = AuthView.renderAuthForm(this.isLoginView);
    }
  }
}

export const authController = new AuthController();