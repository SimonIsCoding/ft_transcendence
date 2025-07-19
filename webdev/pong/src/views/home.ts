// import { GameView } from './game';
// import { gameController } from '../controllers/gameController';
// import { SettingsView } from './settings';
import { MenuView } from './menu';
import { menuController } from '../controllers/menuController';

interface User {
  login: string;
  password: string;
  alias: string;
  token: string;
}

export const HomeView = {
  currentUser: null as User | null,
  isLogin: true,

 render(): string {
    return `
      <div class="flex flex-col min-h-screen bg-[#fbd11b] text-black">
        <header class="flex justify-center items-center h-24 bg-[#fbd11b]">
          <img src="/pong-logo.png" alt="PONG Logo" class="h-16">
          <a href="/login" id="login-icon" class="hidden absolute right-6 top-6">
            <img src="/login-icon.png" alt="Login" class="h-8 w-8" />
          </a>
          <a href="/logged" id="logged-icon" class="hidden absolute right-6 top-6">
            <img src="/logged-icon.png" alt="Logged" class="h-8 w-8" />
          </a>
        </header>

        <main id="main-content" class="flex-1 flex items-center justify-center bg-[#fbd11b] overflow-y-auto min-h-[450px]">
          ${MenuView.renderMenu()}
        </main>

        <footer class="bg-[#fbd11b] p-4">
        </footer>
      </div>
    `;
  },

  init(): void {
    // GameView.initGameCanvas(); // code to play game
	// gameController.init(); // code to play game
	// HomeView.init();
	menuController.init();
	// SettingsView.initSettings();

  }
};
