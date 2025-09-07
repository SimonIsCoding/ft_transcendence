// import type { User } from "../config";
import { handleSidebar } from "./sidebar/sidebarBehavior";
import { oneVsOneArea } from "./OneVsOneArea";
import { oneVsAIArea } from "./OneVsOneArea";
import { GameRender } from "../pong-erik/GameRender";
import { ShowGame } from "../pong-erik/ShowGame";

export const GameView = {
  
 render(): string {
	return `
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">
		
		<div id="popup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>

		<div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-[64px]">
		</div>
	  ${oneVsOneArea.render()}
	  ${oneVsAIArea.render()}
      ${new GameRender().renderGame()}
    </div>
  `;
  },

  async init(): Promise<void>
  {

    await handleSidebar();
	const gameArea = document.getElementById("gameArea");
	const oneVsOneArea = document.getElementById("oneVsOneArea");
	const oneVsAIArea = document.getElementById("oneVsAIArea");
	
	const player1 = document.getElementById("player1") as HTMLInputElement;
    const player2 = document.getElementById("player2") as HTMLInputElement;
    const player1VSAI = document.getElementById("player1VSAI") as HTMLInputElement;
    let tmp = player2;

	gameArea?.classList.add('hidden');
	if (ShowGame.gameType === 'p-vs-p') {
		oneVsOneArea?.classList.remove('hidden');
		oneVsAIArea?.classList.add('hidden');
	} else if (ShowGame.gameType === 'p-vs-ai') {
		tmp = player1VSAI;
		ShowGame.otherPlayer = tmp.value;
		oneVsOneArea?.classList.add('hidden');
		oneVsAIArea?.classList.remove('hidden');
	}
	if (!tmp && !player1) {
	  new ShowGame().initGame({
	  player1: { alias: "User 1" },
		player2: { alias: "User 2" },
		winner: null
	  });
	}
	

  }
};
