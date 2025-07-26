import { Router } from "../router";

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

      <!-- Sidebar -->
      <div id="sidebar" class="w-1/24 bg-[#fbd11b] flex flex-col transition-all duration-500 ease-in-out overflow-hidden group" style="min-height: 100vh">
        <img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>


		<div class="flex flex-col mt-auto items-center space-y-2 pb-6">
			<button id="loginBtn" class="w-12 border border-black rounded-lg text-sm text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Login</button>
			<button id="registerBtn" class="w-15 border border-black rounded-lg text-[0.825rem] text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Register</button>
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
	const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
	playBtn!.addEventListener('click', () => { Router.navigate('game'); })

	const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement | null;
	loginBtn!.addEventListener('click', () => { Router.navigate('login'); })
	
	const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement | null;
	registerBtn!.addEventListener('click', () => { Router.navigate('register'); })
  }
};
