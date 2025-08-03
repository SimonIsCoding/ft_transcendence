import { HomeView } from './views/home';
import { loginView } from './views/loginView';
import { registerView } from './views/registerView';
import { GameView } from './views/game';
import { gameController } from './controllers/gameController';
import { initTwoFAController } from './controllers/twofaController';

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
  
  public static navigate(
    page: 'home' | 'login' | 'register' | 'game' | 'twofa',
    params?: { email?: string },  // Changed from login to email
    addToHistory = true
  ): void {
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

	case 'twofa':
        if (!params?.email) {
          console.error('email parameter required for twofa route');
          this.navigate('login');
          return;
        }
        gameArea!.innerHTML = '';
        gameArea!.appendChild(initTwoFAController(params.email));
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
      path.includes('twofa') ? 'twofa' :
	  'home', undefined,
	  false);
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
	  this.navigate(
	  path.includes('login') ? 'login' :
	  path.includes('register') ? 'register' :
	  path.includes('game') ? 'game' :
      path.includes('twofa') ? 'twofa' :
	  'home' ,
	  undefined,
	  false);
    });
  }
}

// Initialize router when imported
Router.init();
