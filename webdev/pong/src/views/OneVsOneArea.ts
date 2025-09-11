import type { User } from "../config";
import { oneVsOneAreaInit, oneVsAIAreaInit } from "./sidebar/playBtn/playSidebarBehavior";

export const oneVsOneArea = {
  currentUser: null as User | null,
  isLogin: true,

	render(): string {
	return `
	<main id="oneVsOneArea" class="hidden flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
		<div class="flex flex-col justify-center items-center h-screen">
			<h1 class="text-[#fbd11b]/50 font-bold text-4xl pb-20">1 VS 1</h1>
			<input id="player1" value="" readonly type="text" class="px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60 text-[#fbd11b] placeholder-opacity-50 placeholder-[#fbd11b]/50" />
			<div id="swapAIBtn" class="inline-block my-4 p-2.75">
			</div>
			<input id="player2" type="text" placeholder="Player 2" class="px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60 text-[#fbd11b] placeholder-opacity-50 placeholder-[#fbd11b]/50" />
			<button id="playOneVsOneBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl mt-10">Play</button>
		</div>
	 </main>
	`;
	},

  init(): void {
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
		<div class="flex flex-col justify-center items-center h-screen">
			<h1 class="text-[#fbd11b]/50 font-bold text-4xl pb-20">1 VS AI</h1>
			<input id="player1VSAI" type="text" readonly value="" class="space-y-2 px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60 text-[#fbd11b] placeholder-opacity-50 placeholder-[#fbd11b]/50" />
			<div id="swapAIBtn" class="inline-block my-4 p-2.75">
			</div>
			<button id="AIPlayer" placeholder="AI" class="items-center justify-center text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] px-26 py-1.5 rounded-xl inline-block">
				${AIsvg()}
			</button>
			<button id="playOneVsAIBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl mt-10">Play</button>
		</div>
	 </main>
	`;
	},

  init(): void
  {
	oneVsAIAreaInit();
  }
}
