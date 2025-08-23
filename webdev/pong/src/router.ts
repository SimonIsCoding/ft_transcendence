import { HomeView } from './views/home';
import { loginView } from './views/loginView';
import { registerView } from './views/registerView';
import { GameView } from './views/game';
import { gameController } from './controllers/gameController';
import { currentTournament, matchInfo } from './models/TournamentStore';
import { TournamentUIManager } from './views/TournamentUIManager';


interface User {
  login: string;
  password: string;
  mail: string;
  photo: string;
  token: string;
}

export class Router {
  private static app = document.getElementById('app');
  public static currentUser: User | null;

  public static navigate(
    page: 'home' | 'login' | 'register' | 'game' | 'tournament',
    addToHistory = true
  ): void {
    if (!this.app) {
      console.error('App container not found');
      return;
    }

  // Handle route protection + rendering
  //const gameArea = document.getElementById('gameArea') as HTMLDivElement | null;
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

      case 'tournament':

      const tournamentArea = document.getElementById('tournamentArea');
      let gameCanvasContainer = document.getElementById('gameCanvasContainer');

      if (!gameCanvasContainer && tournamentArea?.parentNode) {
        gameCanvasContainer = document.createElement('div');
        gameCanvasContainer.id = 'gameCanvasContainer';
        gameCanvasContainer.className = 'hidden content bg-[#fbd11b] h-full';
        tournamentArea.appendChild(gameCanvasContainer);
      }
      if (matchInfo && matchInfo.partidoActivo) {
        gameCanvasContainer?.classList.remove('hidden');

        if (gameCanvasContainer && gameCanvasContainer.innerHTML === '') {
          gameCanvasContainer.innerHTML = GameView.renderGameCanvas();
          GameView.initGameCanvas();
        }

        GameView.setPlayersAndCallback(
          matchInfo.player1,
          matchInfo.player2,
          matchInfo.onMatchEnd
        );
        gameController.init();

      } else {
        gameCanvasContainer?.classList.add('hidden');
        tournamentArea?.classList.remove('hidden');
        if (currentTournament) {
          TournamentUIManager.updateBracket(currentTournament);
        }
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
	  path.includes('game') ? 'game' :
	  path.includes('tournament') ? 'tournament' :
	  'home',
	  false);
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
	  this.navigate(
	  path.includes('login') ? 'login' :
	  path.includes('register') ? 'register' :
	  path.includes('game') ? 'game' :
	  path.includes('tournament') ? 'tournament' :
	  'home' ,
	  false);
    });
  }
}

// Initialize router when imported
Router.init();