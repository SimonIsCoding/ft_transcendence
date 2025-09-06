import type { User } from "./config";
import { HomeView } from './views/home';
import { loginView } from './views/loginView';
import { registerView } from './views/registerView';
// import { GameView } from './views/game';
// import { gameController } from './controllers/gameController';

import { matchInfo } from './models/TournamentStore';
// import { TournamentUIManager } from './views/TournamentUIManager';
// import { Game } from './pong-erik/Game';
import { GameRender } from './pong-erik/GameRender';
import { ShowGame } from './pong-erik/ShowGame';
// import { TournamentController } from './controllers/TournamentController';

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
        ShowGame.cleanup(); // Clean up any running games
        ShowGame.gameController = false;
        this.app.innerHTML = HomeView.render();
        HomeView.init();
        break;

      case 'login':
        ShowGame.cleanup(); // Clean up any running games
        this.app.innerHTML = loginView.render();
        loginView.init();
        break;

      case 'register':
        ShowGame.cleanup(); // Clean up any running games
        this.app.innerHTML = registerView.render();
        registerView.init();
        break;

      case 'game':
        if (!ShowGame.inGame) {
          Router.navigate('home');
          ShowGame.inGame = false;
          return;
        }
        const player1 = document.getElementById("player1") as HTMLInputElement;
        const player2 = document.getElementById("player2") as HTMLInputElement;
        const player1VSAI = document.getElementById("player1VSAI") as HTMLInputElement;
        let tmp = player2;
        if (ShowGame.gameType === 'p-vs-ai') {
          tmp = player1VSAI;
          ShowGame.otherPlayer = tmp.value;
        }
        if (!tmp && !player1) {
          new ShowGame().initGame({
          player1: { alias: "User 1" },
            player2: { alias: "User 2" },
            winner: null
          });
        } else {
          new ShowGame().initGame({
          player1: { alias: player1.value },
            player2: { alias: tmp.value },
            winner: null
          });
        }
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

        console.log('matchInfo en router', matchInfo)
        if (gameCanvasContainer && matchInfo && matchInfo.partidoActivo) {

          const gameArea = document.getElementById('gameArea');
          gameArea?.classList.add('hidden');

          const renderGame = new GameRender().render();
          gameCanvasContainer.innerHTML = renderGame;
        }
        else if (window.location.pathname === "/tournament"){
          console.log('no hay partido activo, se muestra torneo');
            Router.navigate('home');
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
                'home',
        false);
    });

    // Clean up games when the page is about to unload
    window.addEventListener('beforeunload', () => {
      ShowGame.cleanup();
    });
  }
}

// Initialize router when imported
Router.init();