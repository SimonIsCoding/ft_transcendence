import { Router } from "../router";
// import { isConnected } from "../services/sidebarService/utilsSidebarService";
// import { oneVsAIAreaInit, oneVsOneAreaInit } from "./sidebar/playBtn/playSidebarBehavior";
// import { toggleMenuVisibility } from "./sidebar/sidebarUtils";

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

export const playButton = {
  currentUser: null as User | null,
  isLogin: true,

	render(): string {
	return `
	<main id="gameArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
		<button id="playBtn" class="text-[#fbd11b] text-5xl rounded-lg border border-[#fbd11b] px-12 py-6 rounded-lg hover:bg-[#fbd11b] hover:text-black transition">
		PLAY
		</button>
	 </main>
	`;
	},

  async init()
  {
	// const status = await isConnected();
	// if (status === true)
	// {
	// 	console.log("entered in status = true");
	// 	const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
	// 	playBtn?.addEventListener('click', () => { 
	// 		const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	// 		toggleMenuVisibility('playSubmenu', submenus);
	// 		oneVsOneAreaInit();
	// 		oneVsAIAreaInit();
	// 	 })
	// }
	// else
	// {
	// }
		const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
		playBtn?.addEventListener('click', () => { Router.navigate('game'); })
  }
}