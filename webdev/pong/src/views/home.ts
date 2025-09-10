import type { User } from "../config";
import { playButton } from "./playButton";
import { updateSidebar } from "./sidebar/sidebarBehavior";
// import { oneVsOneArea } from "./OneVsOneArea";
// import { oneVsAIArea } from "./OneVsOneArea";
// import { TournamentArea } from "./TournamentArea";
// import { GameRender } from "../pong-erik/GameRender";

export const HomeView = {
  currentUser: null as User | null,
  isLogin: true,
  
 render(): string {
	return `

      ${playButton.render()}
  `;
  },

  async init(): Promise<void>
  {
    await updateSidebar();
    playButton.init();
  }
};
