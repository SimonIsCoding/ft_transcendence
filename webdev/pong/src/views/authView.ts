import { authService } from '../services/authService.ts';

export const AuthView = {
  render(): string {
    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
      return this.renderAuthSelector();
    } else {
      return this.renderProfile(currentUser.email);
    }
  },

  renderAuthSelector(): string {
    return `
      <div class="p-4 space-y-4">
        <h2 class="text-xl font-bold">Welcome!</h2>
        <div class="flex space-x-4">
          <button id="loginBtn" class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
          <button id="register-btn" class="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
            Register
          </button>
        </div>
      </div>
    `;
  },

  renderAuthForm(isLogin: boolean): string {
    return `
      <div class="space-y-4 p-4">
        <h2 class="text-xl font-bold">${isLogin ? 'Login' : 'Register'}</h2>
        <form id="auth-form" class="space-y-3">
          <input type="email" id="email" placeholder="Email" required
                 class="w-full px-3 py-2 border rounded">
          <input type="password" id="password" placeholder="Password" required
                 class="w-full px-3 py-2 border rounded">
          <button type="submit" 
                  class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            ${isLogin ? 'Login' : 'Register'}
          </button>
          <button id="toggle-auth" type="button"
                  class="w-full text-blue-500 underline text-sm">
            ${isLogin ? 'Need an account? Register' : 'Have an account? Login'}
          </button>
        </form>
        <div id="auth-error" class="text-red-500 text-sm"></div>
      </div>
    `;
  },

  renderProfile(email: string): string {
    return `
      <div class="p-4 space-y-3">
        <h3 class="font-bold text-lg">Profile</h3>
        <p>Logged in as: <strong>${email}</strong></p>
        <button id="logout-btn"
                class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    `;
  }
};