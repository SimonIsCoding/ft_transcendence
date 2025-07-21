import { HomeView } from './views/home';
import { infoView, loginView, registerView, chooseTypeOfGameView } from './views/menu';
import { showGame } from './controllers/menuController';

export class Router {
  private static app = document.getElementById('app');
public static navigate(page: 'home' | 'login' | 'register' | 'info' | 'play' | 'game' , addToHistory = true): void {
  if (!this.app) {
    console.error('App container not found');
    return;
  }

  // Handle route protection + rendering
  const fullCanva = document.getElementById('fullCanva') as HTMLDivElement | null;
  switch (page) {
    case 'home':
      this.app.innerHTML = HomeView.render();
      HomeView.init();
      break;

    case 'info':
      if (fullCanva)
        fullCanva.innerHTML = infoView.render();
      break;

	case 'login':
      if (fullCanva)
        fullCanva.innerHTML = loginView.render();
      break;

	case 'register':
      if (fullCanva)
        fullCanva.innerHTML = registerView.render();
      break;

	case 'play':
      if (fullCanva)
        fullCanva.innerHTML = chooseTypeOfGameView.render();
      break;

	case 'game':
	  if (fullCanva)
		showGame(fullCanva);
      break;
  }

  if (addToHistory)
    history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
}

  public static init(): void {
    // Handle initial load
    window.addEventListener('load', () => {
      const path = window.location.pathname;
	  this.navigate(
	  path.includes('login') ? 'login' :
	  path.includes('register') ? 'register' :
	  path.includes('play') ? 'play' :
	  path.includes('game') ? 'game' :
	  path.includes('info') ? 'info' :
	  'home' , false);

    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
	  this.navigate(
	  path.includes('login') ? 'login' :
	  path.includes('register') ? 'register' :
	  path.includes('play') ? 'play' :
	  path.includes('game') ? 'game' :
	  path.includes('info') ? 'info' :
	  'home' , false);

    });
  }
}

// Initialize router when imported
Router.init();