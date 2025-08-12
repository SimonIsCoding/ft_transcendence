import { HomeView } from './views/home';
import { loginView } from './views/loginView';
import { registerView } from './views/registerView';
import { GameView } from './views/game';
import { gameController } from './controllers/gameController';
import { initTwoFAController } from './controllers/twofaController';
// import { TournamentArea } from './views/TournamentArea';
import { currentTournament, matchInfo } from './models/TournamentStore';
import { TournamentUIManager } from './views/TournamentUIManager';

// import { TournamentView } from './views/TournamentView.ts';
// import { TournamentController } from './controllers/TournamentController.ts';
// import { TournamentModel } from './models/TournamentModel.ts';

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
    page: 'home' | 'login' | 'register' | 'game' | 'twofa' | 'tournament',
    params?: { email?: string },  // Changed from login to email
    addToHistory = true
  ): void {
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

      case 'tournament':

        // this.app.innerHTML = GameView.renderGameCanvas();
        // console.log('antes de iniciar el juego')
        // GameView.initGameCanvas();
        // console.log('despues de iniciar el juego')
        // const controller = new TournamentController();
        // controller.iniciarTorneo();
        // gameController.init();
        // this.app.innerHTML = TournamentView.render();
        // TournamentView.init();
        const tournamentArea = document.getElementById('tournamentArea');
        let gameCanvasContainer = document.getElementById('gameCanvasContainer');

        // Si el contenedor del juego no existe, lo creamos y lo añadimos al DOM una sola vez.
        // Lo añadimos como hermano de tournamentArea para que no interfiera.
        if (!gameCanvasContainer && tournamentArea?.parentNode) {
          gameCanvasContainer = document.createElement('div');
          gameCanvasContainer.id = 'gameCanvasContainer';
          gameCanvasContainer.className = 'hidden contents'; // Empieza oculto
          tournamentArea.parentNode.appendChild(gameCanvasContainer);
        }

        // Ahora viene la lógica de visibilidad
        if (matchInfo && matchInfo.partidoActivo) {
          // ---- SI UN PARTIDO ESTÁ ACTIVO -> MOSTRAMOS EL JUEGO ----

          // Ocultamos el bracket del torneo
          tournamentArea?.classList.add('hidden');
          // Mostramos el contenedor del juego
          gameCanvasContainer?.classList.remove('hidden');

          // Optimizacion: Renderizamos el canvas dentro del contenedor SOLO SI está vacío.
          // Esto evita recrear el canvas en cada partido del mismo torneo.
          if (gameCanvasContainer && gameCanvasContainer.innerHTML === '') {
            gameCanvasContainer.innerHTML = GameView.renderGameCanvas();
            GameView.initGameCanvas();
          }

          // Configuramos y lanzamos el juego
          GameView.setPlayersAndCallback(
            matchInfo.player1,
            matchInfo.player2,
            matchInfo.onMatchEnd
          );
          gameController.init();

        } else {
          // ---- SI NO HAY PARTIDO ACTIVO -> MOSTRAMOS EL BRACKET ----

          // Ocultamos el contenedor del juego
          gameCanvasContainer?.classList.add('hidden');
          // Mostramos el bracket del torneo
          tournamentArea?.classList.remove('hidden');

          // ¡AHORA ESTO FUNCIONARÁ!
          // Como tournamentArea nunca fue eliminado, podemos actualizarlo.
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
              path.includes('twofa') ? 'twofa' :
                path.includes('tournament') ? 'tournament' :
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
                path.includes('tournament') ? 'tournament' :
                  'home',
        undefined,
        false);
    });
  }
}

// Initialize router when imported
Router.init();
