import type { User } from "../config";
import { handleSidebar } from "./sidebar/sidebarBehavior";
import { TournamentArea } from "./TournamentArea";
import { GameRender } from "../pong-erik/GameRender";

export const TournamentView = {
  
 render(): string {
	return `
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">
		
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
    TournamentArea.init();
  }
};
