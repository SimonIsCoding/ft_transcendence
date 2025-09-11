import { Router } from "../router";
import { updateSidebar } from "./sidebar/sidebarBehavior";
import { TournamentArea } from "./TournamentArea";
import { GameRender } from "../pongGame/GameRender";
import { matchInfo } from '../models/TournamentStore';
import { getCurrentUser } from "./sidebar/sidebarUtils";
import { showErrorPopup } from "../utils/utils";

export const TournamentView = {
  
 render(): string {
	return `
      ${TournamentArea.render()}
      ${new GameRender().renderGame()}
  `;
  },

  async init(): Promise<void>
  {
    await updateSidebar();
	const currentUser = getCurrentUser();
	if (!currentUser) {
		Router.navigate('home');
		showErrorPopup("Not logged. You can't access this game.", "popup");
		return;
	}	
  let host = document.getElementById('alias1') as HTMLInputElement
  host.disabled = true;
	const tournamentArea = document.getElementById('tournamentArea');
	const esquemaTorneo = document.getElementById("esquemaTorneo");
	let gameCanvasContainer = document.getElementById('gameCanvasContainer');
    if (!gameCanvasContainer && tournamentArea?.parentNode) {
      gameCanvasContainer = document.createElement('div');
      gameCanvasContainer.id = 'gameCanvasContainer';
      gameCanvasContainer.className = 'hidden content bg-[#fbd11b] h-full';
      tournamentArea.appendChild(gameCanvasContainer);
    }
    if (gameCanvasContainer && matchInfo && matchInfo.partidoActivo) {
      const gameArea = document.getElementById('gameArea');
      gameArea?.classList.add('hidden');
      const renderGame = new GameRender().render();
      gameCanvasContainer.innerHTML = renderGame;
	}
		tournamentArea?.classList.remove('hidden');
		esquemaTorneo?.classList.remove('hidden');
                TournamentArea.init();

  }
};
