import { HomeView } from './views/home';
import { infoView } from './views/menu';
import { loginView } from './views/loginView';
import { registerView } from './views/registerView';
import { chooseTypeOfGameView } from './views/chooseTypeOfGameView'
// import { showGame } from './controllers/menu/menuController';
import { GameView } from './views/game';
import { userLogged } from './views/userLogged.ts';
import { gameController } from './controllers/gameController';

export class Router {
  private static app = document.getElementById('app');
public static navigate(page: 'home' | 'login' | 'register' | 'info' | 'play' | 'game' | 'userLogged' , addToHistory = true): void {
  if (!this.app) {
    console.error('App container not found');
    return;
  }

  // Handle route protection + rendering
  const gameArea = document.getElementById('gameArea') as HTMLDivElement | null;
  switch (page) {
    case 'home':
      this.app.innerHTML = HomeView.render();
      HomeView.init();
      break;

    case 'info':
      if (gameArea)
        gameArea.innerHTML = infoView.render();
      break;
	
	case 'login':
      if (gameArea)
      {
		gameArea.innerHTML = loginView.render();
		loginView.init();
	  }
      break;
	
	case 'register':
      if (gameArea)
      {
		gameArea.innerHTML = registerView.render();
		registerView.init();
	  }
      break;
	
	case 'play':
      if (gameArea)
	  {
		gameArea.innerHTML = chooseTypeOfGameView.render();
		chooseTypeOfGameView.init();
	  }
      break;

	case 'game':
	  if (gameArea)
	  {
		gameArea.innerHTML = GameView.renderGameCanvas();
		GameView.initGameCanvas();
		gameController.init();
	  }
      break;

	case 'userLogged':
      if (gameArea)
	  {
		gameArea.innerHTML = userLogged.render();
		userLogged.init();
	  }
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
	  path.includes('userLogged') ? 'userLogged' :
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
	  path.includes('userLogged') ? 'userLogged' :
	  'home' , false);
    });
  }
}

// Initialize router when imported
Router.init();
