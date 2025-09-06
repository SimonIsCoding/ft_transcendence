import type { User } from "./config";
import { HomeView } from './views/home';
import { loginView } from './views/loginView';
import { registerView } from './views/registerView';
import { GameView } from './views/game';
import { gameController } from './controllers/gameController';
import { matchInfo } from './models/TournamentStore';
// import { TournamentUIManager } from './views/TournamentUIManager';
// import { Game } from './pong-erik/Game';
import { GameRender } from './pong-erik/GameRender';
// import { TournamentController } from './controllers/TournamentController';


function NotFound() {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn’t exist.</p>
      <a href="/">Go Home</a>
    </div>
  `;
}

// at the top of router.ts
export type Route = 'home' | 'login' | 'register' | 'game' | 'tournament' | 'notfound';

export class Router {
  private static app = document.getElementById('app');
  public static currentUser: User | null;

  public static navigate(
    page: Route,
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

      case 'notfound': NotFound(); break;

      case 'tournament':

        const tournamentArea = document.getElementById('tournamentArea');
        let gameCanvasContainer = document.getElementById('gameCanvasContainer');

        if (!gameCanvasContainer && tournamentArea?.parentNode) {
          gameCanvasContainer = document.createElement('div');
          gameCanvasContainer.id = 'gameCanvasContainer';
          gameCanvasContainer.className = 'hidden content bg-[#fbd11b] h-full';
          tournamentArea.appendChild(gameCanvasContainer);
        }
        // if (matchInfo && matchInfo.partidoActivo) {
        // gameCanvasContainer?.classList.remove('hidden');
        // console.log('entraaa???')
        // anterior
        // if (gameCanvasContainer && gameCanvasContainer.innerHTML === '') {
        //   gameCanvasContainer.innerHTML = GameView.renderGameCanvas();
        //   GameView.initGameCanvas();
        // }

        //  new 
        console.log('matchInfo en router', matchInfo)
        if (gameCanvasContainer && matchInfo && matchInfo.partidoActivo) {
          const renderGame = new GameRender().render();
          gameCanvasContainer.innerHTML = renderGame;
          // console.log('renderGame', renderGame);
          console.log('✅ ANTES de crear Game instance');
          // const game = new Game({
          //       leftPlayer: matchInfo.player1,
          //       rightPlayer: matchInfo.player2, maxScore: 2, gameMode: 'p-vs-p',
          //       onFinish(winner, score1, score2) {
          //         console.log('🏆 Partido terminado. Ganador:', winner, score1, score2);
          //       },
          //   });
          console.log('✅ Game instance creada - ¿Ya empezó el juego?');

          // game.start();
          // console.log(game)
          console.log('✅ DESPUÉS de game.start()');

          // const controller = new TournamentController();
          // controller.iniciarTorneo();
          // console.log(res)
        }
        // } 
        else if (window.location.pathname === "/tournament"){
          console.log('no hay partido activo, se muestra torneo');
            Router.navigate('home');
        }
        break;
    }


    if (addToHistory && page !== 'notfound')
      history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
  }

  private static resolveRoute(path: string): Route {
    if (path.includes('login')) return 'login';
    if (path.includes('register')) return 'register';
    if (path.includes('game')) return 'game';
    if (path.includes('tournament')) return 'tournament';
    if (path === '/' || path === '') return 'home';
    return 'notfound'; // 👈 fallback
  }

  public static init(): void {
    // Handle initial load
    window.addEventListener('load', () => {
      const route = this.resolveRoute(window.location.pathname);
      this.navigate(route, false);
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
      const route = this.resolveRoute(window.location.pathname);
      this.navigate(route, false);
    });
  }
}

// Initialize router when imported
Router.init();
