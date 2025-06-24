import { login, register } from '../api/auth';
import { Router } from '../router';

// 1. Type Definitions
interface User {
  email: string;
  token: string;
}

// @ts-ignore-next-line: Used for reference only
interface AuthResponse {
  status: string;
  data: {
    user: { email: string };
    token: string;
  };
}

// 2. State Management
let currentUser: User | null = null;
let isLogin = true;

// 3. DOM Helpers with Null Checks
const getSafeElement = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element #${id} not found`);
  return el as T;
};

const createErrorElement = (): HTMLDivElement => {
  const form = getSafeElement<HTMLFormElement>('auth-form');
  const div = document.createElement('div');
  div.id = 'auth-error';
  div.className = 'mt-4 text-red-600 text-center';
  form.appendChild(div);
  return div;
};

const showAuthError = (message: string): void => {
  const errorContainer = document.getElementById('auth-error') || createErrorElement();
  errorContainer.textContent = message;
};

// 4. HomeView Implementation
export const HomeView = {
  render(): string {
    const isLoggedIn = !!localStorage.getItem('authToken'); // Simple check
	return `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div id="auth-container" class="sm:mx-auto sm:w-full sm:max-w-md">
        ${isLoggedIn ? this.renderWelcome() : this.renderAuthForm()}
      </div>
    </div>
  `;
  },

  renderWelcome(): string {
	return `
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900">
        Welcome, ${currentUser?.email ?? 'User'}!
      </h2>
      <button id="logout-btn" class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
        Logout
      </button>
    </div>
  `;
  },

  renderAuthForm(): string {
  return `
    <h2 class="text-center text-3xl font-extrabold text-gray-900">
      ${isLogin ? 'Sign In' : 'Register'}
    </h2>
    <form id="auth-form" class="mt-8 space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="${isLogin ? 'current-password' : 'new-password'}"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
      </div>
      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          ${isLogin ? 'Sign in' : 'Register'}
        </button>
      </div>
    </form>
    <button id="toggle-auth" class="mt-6 text-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
      ${isLogin ? 'Need an account? Register' : 'Already have an account? Sign in'}
    </button>
    <div id="auth-error" class="mt-4 text-red-600 text-center"></div>
    `;
  },


  initEventListeners(): void  {
  const form = document.getElementById('auth-form');
  if (!form) {
    // Try again on next animation frame
    requestAnimationFrame(() => this.initEventListeners());
    return;
  }

    try {
      // Form submission
      getSafeElement<HTMLFormElement>('auth-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = getSafeElement<HTMLInputElement>('email').value;
        const password = getSafeElement<HTMLInputElement>('password').value;

        try {
          const response = await (isLogin ? login(email, password) : register(email, password));
          
          if (!response?.status || !response.data?.token) {
            throw new Error('Invalid API response');
          }

          if (response.status === 'success') {
            currentUser = {
              email: response.data.user.email,
              token: response.data.token
            };
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userEmail', response.data.user.email);
            this.updateUI();
            Router.navigate('dashboard');
          }
        } catch (error) {
          showAuthError(error instanceof Error ? error.message : 'Authentication failed');
        }
      });

      // Toggle auth mode
      getSafeElement<HTMLButtonElement>('toggle-auth').addEventListener('click', (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        this.updateUI();
      });

      // Logout
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          currentUser = null;
          localStorage.removeItem('authToken');
          localStorage.removeItem('userEmail');
          this.updateUI();
        });
      }
    } catch (error) {
      console.error('Error initializing event listeners:', error);
    }
  },

  updateUI(): void  {
    const container = document.getElementById('auth-container');
    if (!container) return;
    
    const isLoggedIn = !!localStorage.getItem('authToken'); // Simple check
    container.innerHTML = isLoggedIn ? this.renderWelcome() : this.renderAuthForm();
    this.initEventListeners();
  },

  init(): void  {
    const token = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    if (token && userEmail) {
      currentUser = { 
        email: userEmail, // Replace with actual user data in real app
        token: token
      };
    }
    this.updateUI();
  }
};

// Initialize on load
HomeView.init();
