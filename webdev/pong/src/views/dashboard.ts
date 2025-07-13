import { Router } from '../router';

export default class DashboardView {
  private currentUser: { email: string; token: string } | null = null;

  constructor() {
    this.initializeUser();
  }

  private initializeUser(): void {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    if (token && userEmail) {
      // In a real app, you would verify the token and fetch user data
      this.currentUser = {
        email: userEmail, // Replace with actual user data
        token: token
      };
    } else {
      Router.navigate('home');
    }
  }

  public render(): string {
    return `
      <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="w-64 bg-white shadow-md p-4">
          <div class="p-4 border-b">
            <p class="font-medium">${this.currentUser?.email || 'User'}</p>
          </div>
          <ul class="mt-4 space-y-2">
            <li>
              <button id="logout-btn" class="w-full text-left p-2 rounded hover:bg-gray-100 text-red-600">
                Logout
              </button>
            </li>
          </ul>
        </div>

        <!-- Main Content -->
        <main class="flex-1 overflow-auto p-8">
          <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
          <div class="bg-white p-6 rounded-lg shadow">
            <p>Welcome to your dashboard!</p>
          </div>
        </main>
      </div>
    `;
  }

  public initEventListeners(): void {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', this.handleLogout.bind(this));
    }
  }

  private handleLogout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    this.currentUser = null;
    Router.navigate('home');
  }

  // Initialize the dashboard
  public initialize(): void {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = this.render();
      this.initEventListeners();
    } else {
      console.error('App container not found');
    }
  }
}

export { DashboardView };

