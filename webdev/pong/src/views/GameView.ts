// import type { User } from "../config";
import { Router } from "../router";
import { handleSidebar } from "./sidebar/sidebarBehavior";
import { oneVsOneArea } from "./OneVsOneArea";
import { oneVsAIArea } from "./OneVsOneArea";
import { GameRender } from "../pongGame/GameRender";
import { ShowGame } from "../pongGame/ShowGame";
import { getCurrentUser } from "./sidebar/sidebarUtils";
import { showErrorPopup } from "../utils/utils";

export const GameView = {
  
 render(): string {
	return `

	  ${oneVsOneArea.render()}
	  ${oneVsAIArea.render()}
      ${new GameRender().renderGame()}
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
		winner: null,
		type: '1vs1'
	  });
	}
	

  }
};
