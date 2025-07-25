import { loggedController } from '../controllers/menu/loggedController.ts';

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

export const userLogged = {
  currentUser: null as User | null,
  isLogin: true,

 render(): string {
	return `
	<div id="successPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
	</div>
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">

	  <!-- Sidebar -->
	  <div id="sidebar" class="group w-[6%] hover:w-[20%] bg-[#fbd11b] flex flex-col transition-all duration-500 ease-in-out overflow-hidden" style="min-height: 100vh">
		<img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>

		<div id="sidebarMiddlePart">
			<button id="playSidebarBtn" class="mx-auto my-4 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-yellow-400 transition">Play</button>
			<!-- Hidden submenu -->
			<div id="playSubmenu" class="hidden flex-col items-center mt-4 space-y-3">
				<button id="oneVsOneBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-yellow-400">1 vs 1</button>
				<button id="oneVsAiBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-yellow-400">1 vs AI</button>
				<button id="tournamentBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-yellow-400">Tournament</button>
			</div>

			<button id="profileSidebarBtn" class="w-12 border border-black rounded-lg text-sm text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Profile</button>
			
			<button id="SettingsSidebarBtn" class="w-15 border border-black rounded-lg text-[0.825rem] text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Settings</button>
		</div>
		
		<div id="sidebarLowPart" class="flex flex-col mt-auto items-center space-y-2 pb-6">
			<button id="logoutSidebarBtn" class="w-15 border border-black rounded-lg text-[0.825rem] text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Log Out</button>
		</div>
	  </div>

	  <!-- Game Area -->
		<main id="gameArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
			<button id="playBtn" class="text-yellow-400 text-5xl rounded-lg border border-yellow-400 px-12 py-6 rounded-lg hover:bg-[#fbd11b] hover:text-black transition">
			PLAY
			</button>
		</main>

	</div>
  `;
  },

	init(): void
  {
	loggedController.init();
  }
};
