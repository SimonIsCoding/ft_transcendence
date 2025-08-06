// import { Router } from "../router";
import { oneVsOneAreaInit } from "./sidebar/playSidebarBehavior";
import { oneVsAIAreaInit } from "./sidebar/playSidebarBehavior";

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

function swapSvg():string
{
	return `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
	<path class="fill-current" d="M41.4 214.6C28.9 202.1 28.9 181.8 41.4 169.3L105.4 105.3C117.9 92.8 138.2 92.8 150.7 105.3L214.7 169.3C227.2 181.8 227.2 202.1 214.7 214.6C202.2 227.1 181.9 227.1 169.4 214.6L160 205.2L160 415.9C160 451.2 188.7 479.9 224 479.9C259.3 479.9 288 451.2 288 415.9L288 223.9C288 153.2 345.3 95.9 416 95.9C486.7 95.9 544 153.3 544 224L544 434.7L553.4 425.3C565.9 412.8 586.2 412.8 598.7 425.3C611.2 437.8 611.2 458.1 598.7 470.6L534.7 534.6C528.7 540.6 520.6 544 512.1 544C503.6 544 495.5 540.6 489.5 534.6L425.5 470.6C413 458.1 413 437.8 425.5 425.3C438 412.8 458.3 412.8 470.8 425.3L480.2 434.7L480.2 224C480.2 188.7 451.5 160 416.2 160C380.9 160 352.2 188.7 352.2 224L352.2 416C352.2 486.7 294.9 544 224.2 544C153.5 544 96 486.7 96 416L96 205.3L86.6 214.7C74.1 227.2 53.8 227.2 41.3 214.7z"/>
	</svg>
	`
}

export const oneVsOneArea = {
  currentUser: null as User | null,
  isLogin: true,

	render(): string {
	return `
	<main id="oneVsOneArea" class="hidden flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
		<div id="oneVsOneAreaPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>
		<div class="flex flex-col justify-center items-center h-screen">
			<h1 class="text-[#fbd11b]/50 font-bold text-4xl pb-20">1 VS 1</h1>
			<input id="player1" type="text" placeholder="Player 1" class="px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60 text-[#fbd11b] placeholder-opacity-50 placeholder-[#fbd11b]/50" />
			<button id="swapBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75">
				${swapSvg()}
			</button>
			<input id="player2" type="text" placeholder="Player 2" class="px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60 text-[#fbd11b] placeholder-opacity-50 placeholder-[#fbd11b]/50 mb-10" />
			<button id="playOneVsOneBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl">Play</button>
		</div>
	 </main>
	`;
	},

  init(): void
  {
	oneVsOneAreaInit();
  }
}















function AIsvg(): string
{
	return `
	<svg class="w-8 h-8" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="currentColor" fill="none"><circle cx="34.52" cy="11.43" r="5.82"/><circle cx="53.63" cy="31.6" r="5.82"/><circle cx="34.52" cy="50.57" r="5.82"/><circle cx="15.16" cy="42.03" r="5.82"/><circle cx="15.16" cy="19.27" r="5.82"/><circle cx="34.51" cy="29.27" r="4.7"/><line x1="20.17" y1="16.3" x2="28.9" y2="12.93"/><line x1="38.6" y1="15.59" x2="49.48" y2="27.52"/><line x1="50.07" y1="36.2" x2="38.67" y2="46.49"/><line x1="18.36" y1="24.13" x2="30.91" y2="46.01"/><line x1="20.31" y1="44.74" x2="28.7" y2="48.63"/><line x1="17.34" y1="36.63" x2="31.37" y2="16.32"/><line x1="20.52" y1="21.55" x2="30.34" y2="27.1"/><line x1="39.22" y1="29.8" x2="47.81" y2="30.45"/><line x1="34.51" y1="33.98" x2="34.52" y2="44.74"/></svg>
	`
}

export const oneVsAIArea = {
  currentUser: null as User | null,
  isLogin: true,

	render(): string {
	return `
	<main id="oneVsAIArea" class="hidden flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
		<div id="oneVsAIAreaPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>
		<div class="flex flex-col justify-center items-center h-screen">
			<h1 class="text-[#fbd11b]/50 font-bold text-4xl pb-20">1 VS AI</h1>
			<input id="player1" type="text" placeholder="Player 1" class="px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60 text-[#fbd11b] placeholder-opacity-50 placeholder-[#fbd11b]/50" />
			<button id="swapBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75">
				${swapSvg()}
			</button>
			<button id="AI" placeholder="AI" class="flex items-center justify-center text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg px-26 py-1.5 rounded-xl inline-block mb-10">
				${AIsvg()}
			</button>
			<button id="playOneVsAIBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl">Play</button>
		</div>
	 </main>
	`;
	},

  init(): void
  {
	oneVsAIAreaInit();
  }
}


