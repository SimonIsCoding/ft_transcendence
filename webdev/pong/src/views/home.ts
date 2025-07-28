import { Router } from "../router";
import { userUnloggedSidebar } from "./sidebarBehavior";

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

export const HomeView = {
  currentUser: null as User | null,
  isLogin: true,

 render(): string {
	return `
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">

      ${userUnloggedSidebar.render()}

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
	userUnloggedSidebar.init();

	const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
	playBtn!.addEventListener('click', () => { Router.navigate('game'); })
  }
};
