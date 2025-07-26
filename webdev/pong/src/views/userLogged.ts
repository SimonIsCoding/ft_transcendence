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
	  <div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-1/24">
		<img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>

		<div id="sidebarMiddlePart" class="h-full flex flex-col items-center justify-center space-y-4">
			<button id="playSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M8 5v14l11-7z"/>
			</svg>
			</button>
			<!-- Hidden submenu -->
			<div id="playSubmenu" class="h-screen absolute left-1/24 top-0 w-48 bg-[#fbd11b] border border-black flex flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50">
				<p id="submenuName" class="px-2 py-1 items-center justify-start">Play</p>
				<button id="oneVsOneBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b]">1 vs 1</button>
				<button id="oneVsAiBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b]">1 vs AI</button>
				<button id="tournamentBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b]">Tournament</button>
			</div>


			<button id="profileSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
			<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
			</svg>
			</button>
			
			<button id="SettingsSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
			<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M19.4 13c.04-.33.1-.66.1-1s-.06-.67-.1-1l2.1-1.65c.2-.16.25-.45.1-.67l-2-3.46a.504.504 0 0 0-.61-.22l-2.5 1c-.5-.38-1.05-.7-1.65-.94L14 2.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5L9.15 5c-.6.24-1.15.56-1.65.94l-2.5-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .1.67L4.6 11c-.04.33-.1.66-.1 1s.06.67.1 1L2.5 14.65a.5.5 0 0 0-.1.67l2 3.46c.14.22.42.3.65.22l2.5-1c.5.38 1.05.7 1.65.94L10 21.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5l.35-2.35c.6-.24 1.15-.56 1.65-.94l2.5 1c.23.08.51 0 .65-.22l2-3.46a.5.5 0 0 0-.1-.67L19.4 13zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>
			</svg>
			</button>
		</div>
		
		<div id="sidebarLowPart" class="flex flex-col mt-auto items-center space-y-2 pb-6">
			<button id="logoutSidebarBtn"
			class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 hover:bg-black transition">
			<svg xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 24 24" 
				class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
				<path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm4-10H8a2 2 0 0 0-2 2v4h2V5h12v14H8v-4H6v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
			</svg>
			</button>
		</div>
	  </div>

	  <!-- Game Area -->
		<main id="gameArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
			<button id="playBtn" class="text-[#fbd11b] text-5xl rounded-lg border border-[#fbd11b] px-12 py-6 rounded-lg hover:bg-[#fbd11b] hover:text-black transition">
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
