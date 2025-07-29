import { playButton } from "./playButton";
import { userUnloggedSidebar } from "./sidebarBehavior";

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

export const HomeView = {
  currentUser: null as User | null,
  isLogin: true,

 render(): string {
	return `
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">

      ${userUnloggedSidebar.render()}

      ${playButton.render()}

    </div>
  `;
  },

  init(): void
  {
	userUnloggedSidebar.init();

	playButton.init();
  }
};
