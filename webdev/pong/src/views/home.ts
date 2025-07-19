// import { GameView } from './game';
// import { gameController } from '../controllers/gameController';
// import { SettingsView } from './settings';
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
		<div id="fullCanva" class="flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
			<div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-gray-900">
				<button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">LOGIN</button>
				<button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">REGISTER</button>
			</div>
			<div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
				<button id="playBtn" class="font-seven text-white uppercase px-6 py-3 border border-white rounded">PLAY</button>
			</div>
		</div>
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
