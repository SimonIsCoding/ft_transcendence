import { Router } from "../router";

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

export const OneVsOneArea = {
  currentUser: null as User | null,
  isLogin: true,

	render(): string {
	return `
	<main id="OneVsOneArea" class="hidden flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
		<div id="successPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>
		<div class="flex flex-col justify-center items-center h-screen">
			<h1 class="text-[#fbd11b]/50 font-bold text-4xl pb-20">1 VS 1</h1>
			<input id="username1" type="text" placeholder="Player 1" class="text-[#fbd11b]/50 px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60" />

			<button id="swapBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75">
				<!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-15 h-15">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h12M10 6l6 4-6 4M20 14H8m6 4l-6-4 6-4" />
				</svg> -->
				${swapSvg()}
			</button>
			
			<input id="usernameV1" type="text" placeholder="Player 2" class="text-[#fbd11b]/50 px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60" />
		</div>
	 </main>
	`;
	},

  init(): void
  {
	const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
	playBtn!.addEventListener('click', () => { Router.navigate('game'); })
  }
}

function swapSvg():string
{
	return `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
	<path class="fill-current" d="M41.4 214.6C28.9 202.1 28.9 181.8 41.4 169.3L105.4 105.3C117.9 92.8 138.2 92.8 150.7 105.3L214.7 169.3C227.2 181.8 227.2 202.1 214.7 214.6C202.2 227.1 181.9 227.1 169.4 214.6L160 205.2L160 415.9C160 451.2 188.7 479.9 224 479.9C259.3 479.9 288 451.2 288 415.9L288 223.9C288 153.2 345.3 95.9 416 95.9C486.7 95.9 544 153.3 544 224L544 434.7L553.4 425.3C565.9 412.8 586.2 412.8 598.7 425.3C611.2 437.8 611.2 458.1 598.7 470.6L534.7 534.6C528.7 540.6 520.6 544 512.1 544C503.6 544 495.5 540.6 489.5 534.6L425.5 470.6C413 458.1 413 437.8 425.5 425.3C438 412.8 458.3 412.8 470.8 425.3L480.2 434.7L480.2 224C480.2 188.7 451.5 160 416.2 160C380.9 160 352.2 188.7 352.2 224L352.2 416C352.2 486.7 294.9 544 224.2 544C153.5 544 96 486.7 96 416L96 205.3L86.6 214.7C74.1 227.2 53.8 227.2 41.3 214.7z"/>
	</svg>
	`
}