// import type { User } from "../config";
import { Router } from "../router";
import { handleSidebar } from "./sidebar/sidebarBehavior";
import { TournamentArea } from "./TournamentArea";
import { GameRender } from "../pong-erik/GameRender";
import { matchInfo } from '../models/TournamentStore';
import { getCurrentUser } from "./sidebar/sidebarUtils";
import { showErrorPopup } from "../utils/utils";

export const TournamentView = {
  
 render(): string {
	return `
	<div class="w-screen h-screen flex bg-black overflow-hidden">
		
		<div id="popup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>

		<div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-[64px]">
		</div>
      ${TournamentArea.render()}
      ${new GameRender().renderGame()}
    </div>
  `;
  },

  async init(): Promise<void>
  {
    await handleSidebar();
	const currentUser = getCurrentUser();
	if (!currentUser) {
		Router.navigate('home');
		showErrorPopup("Not logged. You can't access this game.", "popup");
		return;
	}	
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
