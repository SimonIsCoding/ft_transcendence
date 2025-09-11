import type { User } from "./config";
import { HomeView } from './views/home';
import { loginView } from './views/loginView';
import { registerView } from './views/registerView';
import { ShowGame } from './pongGame/ShowGame';
import { TournamentView } from './views/tournamentView';
import { GameView } from "./views/GameView";


// at the top of router.ts
export type Route = 'home' | 'login' | 'register' | 'game' | 'gameai' | 'tournament';

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
        ShowGame.cleanup(); // Clean up any running games
		ShowGame.inGame = true;
		ShowGame.gameType = 'p-vs-p';
        this.app.innerHTML = GameView.render();
		GameView.init();
        break;

	  case 'gameai':
        ShowGame.cleanup(); // Clean up any running games
		ShowGame.inGame = true;

		ShowGame.gameType = 'p-vs-ai';
        this.app.innerHTML = GameView.render();
		GameView.init();
        break;

      case 'tournament':
        this.app.innerHTML = TournamentView.render();
        TournamentView.init();
        break;
    }


    if (addToHistory)
      history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
  }

  private static resolveRoute(path: string): Route {
    if (path.includes('login')) return 'login';
    if (path.includes('register')) return 'register';
    if (path.includes('gameai')) return 'gameai';
    if (path.includes('game')) return 'game';
    if (path.includes('tournament')) return 'tournament';
    if (path === '/' || path === '') return 'home';
    return 'home'; // 👈 fallback
  }

  public static init(): void {
    // Handle initial load
    window.addEventListener('load', () => {
      const route = this.resolveRoute(window.location.pathname);
      this.navigate(route, false);
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', (event) => {
      const route = this.resolveRoute(window.location.pathname);
      console.log('History changed:', event.state);
      this.navigate(route, false);
    });

    // Clean up games when the page is about to unload
    // window.addEventListener('popstate', (event) => {
    //   console.log('History changed:', event.state);
    // });
    // 
    // window.addEventListener('beforeunload', () => {
    //   if (window.location.pathname === "/tournament")
    //     Router.navigate('home');
    //   ShowGame.cleanup();
    // });
   }
}

// Initialize router when imported
Router.init();
