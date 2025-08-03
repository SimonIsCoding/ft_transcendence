import { Router } from "../router";

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
		<div id="successPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>
		<button id="playBtn" class="text-[#fbd11b] text-5xl rounded-lg border border-[#fbd11b] px-12 py-6 rounded-lg hover:bg-[#fbd11b] hover:text-black transition">
		PLAY
		</button>
	 </main>
	`;
	},

  init(): void
  {
	const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
	playBtn!.addEventListener('click', () => { Router.navigate('game'); })
  }
}