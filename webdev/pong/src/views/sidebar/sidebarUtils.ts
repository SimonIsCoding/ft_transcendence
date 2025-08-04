import { getUserInfo } from '../../services/sidebar'

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
	const playSidebarBtn = document.getElementById('profileSidebarBtn');
	playSidebarBtn?.addEventListener('click', () => {
		toggleMenuVisibility('profileSubmenu', submenus);
	});

	const dashboardBtn = document.getElementById("DashboardBtn");
	const friendsBtn = document.getElementById("friendsListBtn");

	// dashboardBtn?.addEventListener('click', () => {
	// 	openMenu('largeSubmenu');
	// });

	// friendsBtn?.addEventListener('click', () => {
	// 	openMenu('largeSubmenu');
	// });

	[dashboardBtn, friendsBtn].forEach(btn => {
		btn?.addEventListener('click', () => {
			// closeAllMenus(submenus);
			openMenu('largeSubmenu');
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
