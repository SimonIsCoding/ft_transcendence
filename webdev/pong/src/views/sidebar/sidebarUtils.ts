import { getUserInfo } from '../../services/sidebar'

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

export function playSidebarBehavior()
{
	const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	const playSidebarBtn = document.getElementById('playSidebarBtn');
	playSidebarBtn?.addEventListener('click', () => {
		toggleMenuVisibility('playSubmenu', submenus);
	});
}

export function profileSidebarBehavior()
{
	getUserInfo();
	const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	const friendsSubmenu = document.getElementById("friendsSubmenu");
	const dashboardSubmenu = document.getElementById("dashboardSubmenu");

	const playSidebarBtn = document.getElementById('profileSidebarBtn');
	playSidebarBtn?.addEventListener('click', () => {
		toggleMenuVisibility('profileSubmenu', submenus);
	});

	const dashboardBtn = document.getElementById("DashboardBtn");
	dashboardBtn?.addEventListener('click', () => {
		friendsSubmenu?.classList.add('hidden');
		dashboardSubmenu?.classList.remove('hidden');
		openMenu('largeSubmenu');
		openMenu('dashboardSubmenu');
		const backBtnDasboardSubmenu = document.getElementById("backBtnDasboardSubmenu");
		backBtnDasboardSubmenu?.addEventListener('click', () => {
			closeAllMenus(submenus);
			toggleMenuVisibility('profileSubmenu', submenus);
		});
	});
	
	const friendsBtn = document.getElementById("friendsListBtn");
	friendsBtn?.addEventListener('click', () => {
		dashboardSubmenu?.classList.add('hidden');
		friendsSubmenu?.classList.remove('hidden');
		openMenu('largeSubmenu');
		openMenu('friendsSubmenu');
		const backBtnFriendsSubmenu = document.getElementById("backBtnFriendsSubmenu");
		backBtnFriendsSubmenu?.addEventListener('click', () => {
			closeAllMenus(submenus);
			toggleMenuVisibility('profileSubmenu', submenus);
		});
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
}
