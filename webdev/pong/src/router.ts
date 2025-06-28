import { HomeView } from './views/home';
import { DashboardView } from './views/dashboard.ts';

export class Router {
  private static app = document.getElementById('app');

  public static navigate(page: 'home' | 'dashboard'): void {
    if (!this.app) {
      console.error('App container not found');
      return;
    }

    // Clear previous view
    this.app.innerHTML = '';

    // Handle route protection
    if (page === 'dashboard' && !this.isAuthenticated()) {
      console.warn('Redirecting to home: not authenticated');
      return this.navigate('home');
    }

    switch (page) {
      case 'home':
        if (this.isAuthenticated()) {
          return this.navigate('dashboard'); // Redirect if already logged in
        }
        this.app.innerHTML = HomeView.render();
		HomeView.init();
        break;

      case 'dashboard':
        const dashboard = new DashboardView();
        dashboard.initialize();
        break;
    }

    // Update browser history
    history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
  }

  private static isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  public static init(): void {
    // Handle initial load
    window.addEventListener('load', () => {
      const path = window.location.pathname;
      this.navigate(path.includes('dashboard') ? 'dashboard' : 'home');
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
      this.navigate(path.includes('dashboard') ? 'dashboard' : 'home');
    });
  }
}

// Initialize router when imported
Router.init();