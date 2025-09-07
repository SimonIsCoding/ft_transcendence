// import type { User } from "../config";
import { Router } from "../router";
import { handleSidebar } from "./sidebar/sidebarBehavior";
import { oneVsOneArea } from "./OneVsOneArea";
import { oneVsAIArea } from "./OneVsOneArea";
import { GameRender } from "../pong-erik/GameRender";
import { ShowGame } from "../pong-erik/ShowGame";
import { getCurrentUser } from "./sidebar/sidebarUtils";
import { showErrorPopup } from "../utils/utils";

export const GameView = {
  
 render(): string {
	return `
	<div class="w-screen h-screen flex bg-black overflow-hidden">
		
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
	const currentUser = getCurrentUser();
	if (!currentUser && ShowGame.gameType === 'p-vs-ai') {
		Router.navigate('home');
		showErrorPopup("Not logged. You can't access this game.", "popup");
		return;
	}
	  oneVsOneArea.init();
	  oneVsAIArea.init();
	const gamesArea = document.getElementById("gamesArea");
	const oneVsOneElem = document.getElementById("oneVsOneArea");
	const oneVsAIElem = document.getElementById("oneVsAIArea");
    let winner = document.getElementById('winner-screen');

	const player1 = document.getElementById("player1") as HTMLInputElement;
    const player2 = document.getElementById("player2") as HTMLInputElement;
    const player1VSAI = document.getElementById("player1VSAI") as HTMLInputElement;
    let tmp = player2;
	gamesArea?.classList.add('hidden');
	winner?.classList.add('hidden');
	if (ShowGame.gameType === 'p-vs-p') {
		oneVsOneElem?.classList.remove('hidden');
		oneVsAIElem?.classList.add('hidden');
	} else if (ShowGame.gameType === 'p-vs-ai') {
		tmp = player1VSAI;
		ShowGame.otherPlayer = tmp.value;
		oneVsOneElem?.classList.add('hidden');
		oneVsAIElem?.classList.remove('hidden');
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
