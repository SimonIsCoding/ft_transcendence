import type { User } from "../../config";
import { getUserInfo } from '../../services/sidebarService/utilsSidebarService'
import { playSidebarBehavior } from './playBtn/playSidebarBehavior';
import { loadProfileAndPrefill } from './profileBtn/editProfileSubmenuRender';
import { userChangingInfo } from './profileBtn/userChangingInfo';
import { seeFriendsList } from './profileBtn/manageFriendsSubmenu';
import { setupGameSettingsListeners } from '../../controllers/gameSettingsControllers';
import { manageGameHistorial } from "../../services/gameService";
// import { showDashboard, type DashboardData } from "../dashboard";
// import { getUserDashboardDataService } from "../../services/sidebarService/dashboardDataService";

let currentUser: User | null = null;

export function setCurrentUser(user: User): void {
  currentUser = { ...user };
}

export function getCurrentUser(): User | null {
  return currentUser;
}

export function renderBackButton(id: string): string
{
  return `
    <button id="${id}" class="absolute top-1.5 left-1.5 flex items-center group z-50">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span class="text-xs font-semibold text-black group-hover:underline ml-1">Back</span>
    </button>
  `;
}

// for button 'playSidebarBtn' & 'profileSidebarBtn', this function open and close the submenu
export function toggleMenuVisibility(targetId: string | null, submenus: NodeListOf<HTMLElement>)
{
	submenus.forEach(menu => {
		if (menu.id === targetId)
		{
			menu.classList.toggle('max-h-0');
			menu.classList.toggle('max-h-screen');
		}
		else
		{
			menu.classList.add('max-h-0');
			menu.classList.remove('max-h-screen');
		}
	});
}

export function openMenu(menuId: string)
{
	const menu = document.getElementById(menuId);
	if (menu)
	{
		menu.classList.remove('max-h-0');
		menu.classList.add('max-h-screen');
	}
}

//close all submenus
export function closeAllMenus(submenus: NodeListOf<HTMLElement>)
{
	submenus.forEach(menu => {
		menu.classList.add('max-h-0');
		menu.classList.remove('max-h-screen');
	});
}

//toErase
// export const mockDashboardData: DashboardData = {
// 	username: "PlayerOne",
// 	stats: {
// 		won: 12,
// 		lost: 8,
// 		scores: 230,
// 		friends: 5
// 	},
// 	points: {
// 		scored: 150,
// 		received: 180
// 	}
// };


export function profileSidebarBehavior()
{
	getUserInfo();
	const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	const friendsSubmenu = document.getElementById("friendsSubmenu");
	const dashboardSubmenu = document.getElementById("dashboardSubmenu");
	const gameHistorySubmenu = document.getElementById("gameHistorySubmenu");

	const dashboardBtn = document.getElementById("DashboardBtn");
	dashboardBtn?.addEventListener('click', async () => {
		friendsSubmenu?.classList.add('hidden');
		gameHistorySubmenu?.classList.add('hidden');
		dashboardSubmenu?.classList.remove('hidden');
		openMenu('largeSubmenu');
		openMenu('dashboardSubmenu');
		// const dashboardData = await getUserDashboardDataService();
		// showDashboard(dashboardData);// mockDashboardData is just for testing 
		const backBtnDasboardSubmenu = document.getElementById("backBtnDasboardSubmenu");
		backBtnDasboardSubmenu?.addEventListener('click', () => {
			closeAllMenus(submenus);
			toggleMenuVisibility('profileSubmenu', submenus);
		});
	});
	
	const friendsBtn = document.getElementById("friendsListBtn");
	friendsBtn?.addEventListener('click', () => {
		seeFriendsList(submenus, dashboardSubmenu, gameHistorySubmenu, friendsSubmenu);
	});

	const gameHistoryBtn = document.getElementById("gameHistoryBtn");
	const backBtnGameHistorySubmenu = document.getElementById("backBtnGameHistorySubmenu");
	backBtnGameHistorySubmenu?.addEventListener('click', () => {
		console.log("clicked");
		closeAllMenus(submenus);
		toggleMenuVisibility('profileSubmenu', submenus);
	});

	gameHistoryBtn?.addEventListener('click', () => {
		dashboardSubmenu?.classList.add('hidden');
		friendsSubmenu?.classList.add('hidden');
		gameHistorySubmenu?.classList.remove('hidden');
		openMenu('largeSubmenu');
		openMenu('gameHistorySubmenu');

		// Injecte les matchs sans toucher au back button
		manageGameHistorial.main();
	});

	editProfileSubmenuBehavior();
	userChangingInfo();
}

export function seeGameHistorial()
{
	
}

export function editProfileSubmenuBehavior()
{
	const profileSubmenu = document.getElementById("profileSubmenu");
	const editProfileSubmenu = document.getElementById("editProfileSubmenu");
	const profileSidebarBtn = document.getElementById("profileSidebarBtn");
	const editProfileBtn = document.getElementById("editProfileBtn");
	const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	const backBtnEditProfileSubmenu = document.getElementById("backBtnEditProfileSubmenu");

	editProfileBtn?.addEventListener('click', () => {
		loadProfileAndPrefill();
		editProfileSubmenu?.classList.add("max-h-screen");
		editProfileSubmenu?.classList.remove("max-h-0");
		editProfileSubmenu?.classList.remove("hidden");

		backBtnEditProfileSubmenu?.addEventListener('click', () => {
			editProfileSubmenu?.classList.add("max-h-0");
			editProfileSubmenu?.classList.remove("max-h-screen");
		});
		// checkService("twofa", "2FAtoggleSwitch");
		// checkService("GDPR", "anonymousToggleSwitch");
	});

	profileSidebarBtn?.addEventListener('click', () => {
		const isProfileOpen = profileSubmenu?.classList.contains("max-h-screen");
		const isEditProfileOpen = editProfileSubmenu?.classList.contains("max-h-screen");

		if (isProfileOpen || isEditProfileOpen)
		{
			submenus.forEach(menu => {
				menu.classList.remove("max-h-screen");
				menu.classList.add("max-h-0");
			});
		}
		else
		{
			toggleMenuVisibility('profileSubmenu', submenus);
			editProfileSubmenu?.classList.add("max-h-0");
			editProfileSubmenu?.classList.remove("max-h-screen");
		}
	});
}

//open and close settingsSubmenu
export function settingsSidebarBehavior()
{
	const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	const settingsSidebarBtn = document.getElementById("settingsSidebarBtn");
	const largeMenu = document.getElementById('largeSubmenu');
	const settingsSubmenu = document.getElementById('settingsSubmenu');

	settingsSidebarBtn?.addEventListener('click', () => {

		if (settingsSubmenu?.classList.contains('max-h-screen'))
		{
			largeMenu?.classList.add('max-h-0');
			largeMenu?.classList.remove('max-h-screen');
			settingsSubmenu.classList.add('max-h-0');
			settingsSubmenu.classList.remove('max-h-screen');
		}
		else
		{
			closeAllMenus(submenus);
			openMenu('largeSubmenu');
			openMenu('settingsSubmenu');
		}
	});
}

export function setupMenuHandlers()
{
	playSidebarBehavior();
	profileSidebarBehavior();
	settingsSidebarBehavior();
	setupGameSettingsListeners();
}
