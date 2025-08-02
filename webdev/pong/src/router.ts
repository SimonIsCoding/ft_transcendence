import { HomeView } from './views/home';
import { loginView } from './views/loginView';
import { registerView } from './views/registerView';
import { GameView } from './views/game';
import { gameController } from './controllers/gameController';

interface User {
  login: string;
  password: string;
  mail: string;
  photo: string,
  token: string;
}

export class Router {
  private static app = document.getElementById('app');
  public static currentUser: User | null;
  public static navigate(page: 'home' | 'login' | 'register' | 'game' , addToHistory = true): void {
  if (!this.app) {
    console.error('App container not found');
    return;
  }

  // Handle route protection + rendering
  switch (page) {
    case 'home':
      this.app.innerHTML = HomeView.render();
      HomeView.init();
      break;

	case 'login':
      this.app.innerHTML = loginView.render();
	  loginView.init();
      break;
	
	case 'register':
	  this.app.innerHTML = registerView.render();
	  registerView.init();
      break;

	case 'game':
	  this.app.innerHTML = GameView.renderGameCanvas();
	  GameView.initGameCanvas();
	  gameController.init();
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
	  path.includes('game') ? 'game' :
	  'home' , false);
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
	  this.navigate(
	  path.includes('login') ? 'login' :
	  path.includes('register') ? 'register' :
	  path.includes('game') ? 'game' :
	  'home' , false);
    });
  }
}

// Initialize router when imported
Router.init();
