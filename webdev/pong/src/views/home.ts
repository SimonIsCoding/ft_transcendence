import { playButton } from "./playButton";
import { handleSidebar } from "./sidebar/sidebarBehavior";

interface User {
  login: string;
  password: string;
  mail: string;
  photo: string,
  token: string;
}

export const HomeView = {
  currentUser: null as User | null,
  isLogin: true,

 render(): string {
	return `
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">

		<div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-[64px]">
		</div>

      ${playButton.render()}

    </div>
  `;
  },

  async init(): Promise<void>
  {
	await handleSidebar();
	playButton.init();
  }
};
