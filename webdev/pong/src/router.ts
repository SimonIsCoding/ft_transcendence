import { HomeView } from './views/home';
import { infoView } from './views/info.ts';

export class Router {
  private static app = document.getElementById('app');

  public static navigate(page: 'home' | 'info'): void {
    if (!this.app) {
      console.error('App container not found');
      return;
    }

    // Clear previous view
    this.app.innerHTML = '';

    // Handle route protection

    switch (page) {
      case 'home':
        this.app.innerHTML = HomeView.render();
		HomeView.init();
        break;

	  case 'info':
        this.app.innerHTML = infoView.render();
        infoView.init();
        break;
    }

    // Update browser history
    history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
  }

  public static init(): void {
    // Handle initial load
    window.addEventListener('load', () => {
      const path = window.location.pathname;
	  this.navigate(
	    path.includes('info') ? 'info' :
	    'home'
	  );

    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
	  this.navigate(
	  path.includes('info') ? 'info' :
	  'home'
	  );

    });
  }
}

// Initialize router when imported
Router.init();