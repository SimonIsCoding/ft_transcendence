import { Router } from "../../router";
import { isConnected } from "../../services/sidebarService/utilsSidebarService"
import { loadExistingProfilePicture, uploadProfilePicture } from "../../utils/profilePictureUtils";
import { initLogout } from '../../services/sidebarService/logoutService';
import { setCurrentUser, setupMenuHandlers } from './sidebarUtils';
import { gameSettingsSubmenuRender } from './settingsBtn/gameSettingsSubmenuRender';
import { logoutButtonRender } from './logoutButtonRender';
import { profileSubmenuRender } from './profileBtn/profileSubmenuRender'
import { playSubmenuRender } from './playBtn/playSubmenuRender'
import { friendsSubmenuRender } from './profileBtn/friendsSubmenuRender'
import { dashboardSubmenuRender } from './profileBtn/dashboardSubmenuRender'
import { gameHistorySubmenuRender } from './profileBtn/gameHistorySubmenuRender'
import { editProfileSubmenuRender } from './profileBtn/editProfileSubmenuRender'
import { ShowGame } from "../../pongGame/ShowGame";

export const userUnloggedSidebar = {

 render(): string {
	return `
	<img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>

	<div class="flex flex-col mt-auto items-center space-y-2 pb-6">
		<button id="loginBtn" class="w-12 border border-black rounded-lg text-sm text-black font-semibold py-2 hover:bg-black hover:text-yellow-400 transition">Login</button>
		<button id="registerBtn" class="w-full border border-black rounded-lg text-[0.825rem] text-black font-semibold py-2  hover:bg-black hover:text-yellow-400 transition">Register</button>
	</div>
	 `;
  },

  init(): void
  {
	setCurrentUser(null);
	const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement | null;
	loginBtn!.addEventListener('click', () => { Router.navigate('login'); })

	const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement | null;
	registerBtn!.addEventListener('click', () => { Router.navigate('register'); })
  }
}

export const userLoggedSidebar = {
  isLogin: true,

 render(): string {
	return `
	<img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>

	<div id="sidebarMiddlePart" class="h-full flex flex-col items-center justify-center space-y-4">
		<button id="playSidebarBtn" data-target="playSubmenu" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
		<path d="M8 5v14l11-7z"/>
		</svg>
		</button>
		${playSubmenuRender()}

		<button id="profileSidebarBtn" data-target="profileSubmenu" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
		<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
		<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
		</svg>
		</button>
		${profileSubmenuRender()}

		<button id="settingsSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
		<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
		<path d="M19.4 13c.04-.33.1-.66.1-1s-.06-.67-.1-1l2.1-1.65c.2-.16.25-.45.1-.67l-2-3.46a.504.504 0 0 0-.61-.22l-2.5 1c-.5-.38-1.05-.7-1.65-.94L14 2.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5L9.15 5c-.6.24-1.15.56-1.65.94l-2.5-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .1.67L4.6 11c-.04.33-.1.66-.1 1s.06.67.1 1L2.5 14.65a.5.5 0 0 0-.1.67l2 3.46c.14.22.42.3.65.22l2.5-1c.5.38 1.05.7 1.65.94L10 21.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5l.35-2.35c.6-.24 1.15-.56 1.65-.94l2.5 1c.23.08.51 0 .65-.22l2-3.46a.5.5 0 0 0-.1-.67L19.4 13zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>
		</svg>
		</button>
		
	</div>
	${editProfileSubmenuRender()}

	<div id="largeSubmenu" class="submenu h-screen absolute left-[64px] top-0 w-96 bg-[#fbd11b] border border-black flex flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		${dashboardSubmenuRender()}
		${friendsSubmenuRender()}
		${gameHistorySubmenuRender()}
		${gameSettingsSubmenuRender()}
	</div>

	${logoutButtonRender()}
  `;
  },

  init(): void
  {
	setupMenuHandlers();
	const tournamentBtn = document.getElementById('tournamentBtn');
	tournamentBtn?.addEventListener('click', () => { Router.navigate('tournament') });
	const oneVsOneBtn = document.getElementById("oneVsOneBtn");
	oneVsOneBtn?.addEventListener('click', () => {
		ShowGame.inGame = true;
		Router.navigate('game'); 
	});
	const oneVsAIBtn = document.getElementById("oneVsAIBtn");
	oneVsAIBtn?.addEventListener('click', () => {
		ShowGame.inGame = true;
		Router.navigate('gameai');
	});

  }
}

export async function handleSidebar()
{
	const isAuthenticated = await isConnected();
	const sidebar = document.getElementById("sidebar");
	if (isAuthenticated)
	{
		sidebar!.innerHTML = userLoggedSidebar.render();
		userLoggedSidebar.init();
		initLogout();
		uploadProfilePicture();
		loadExistingProfilePicture();
	}
	else
	{
		sidebar!.innerHTML = userUnloggedSidebar.render();
		userUnloggedSidebar.init();
	}
}

export async function updateSidebar() {
  const isAuthenticated = await isConnected();
  const sidebar = document.getElementById("sidebar");

  if (!sidebar) return;

  // Check current state from DOM
  const hasLoginBtn = !!sidebar.querySelector("#loginBtn");
  const hasLogoutBtn = !!sidebar.querySelector("#logoutSidebarBtn");

  if (isAuthenticated && !hasLogoutBtn) {
    // Should be logged, but DOM shows unlogged
    sidebar.innerHTML = userLoggedSidebar.render();
    userLoggedSidebar.init();
    initLogout();
    uploadProfilePicture();
    loadExistingProfilePicture();
  } else if (!isAuthenticated && !hasLoginBtn) {
    // Should be unlogged, but DOM shows logged
    sidebar.innerHTML = userUnloggedSidebar.render();
    userUnloggedSidebar.init();
  }
}

