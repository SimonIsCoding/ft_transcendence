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

export function closeAllMenus(submenus: NodeListOf<HTMLElement>)
{
	submenus.forEach(menu => {
		menu.classList.add('max-h-0');
		menu.classList.remove('max-h-screen');
	});
}

export function setupMenuHandlers()
{
	const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	const dataTargetButtons = document.querySelectorAll('button[data-target]');

	dataTargetButtons.forEach(button => {
		button.addEventListener('click', () => {
			const targetId = button.getAttribute('data-target');
			toggleMenuVisibility(targetId, submenus);
		});
	});

	const dashboardBtn = document.getElementById("DashboardBtn");
	const friendsBtn = document.getElementById("friendsListBtn");
	const settingsSidebarBtn = document.getElementById("settingsSidebarBtn");

	[dashboardBtn, friendsBtn].forEach(btn => {
		btn?.addEventListener('click', () => {
			closeAllMenus(submenus);
			openMenu('largeSubmenu');
		});
	});

	settingsSidebarBtn?.addEventListener('click', () => {
		const largeMenu = document.getElementById('largeSubmenu');
		const settingsSubmenu = document.getElementById('settingsSubmenu');

		if (largeMenu?.classList.contains('max-h-screen'))
		{
			largeMenu.classList.add('max-h-0');
			largeMenu.classList.remove('max-h-screen');
			settingsSubmenu?.classList.add('max-h-0');
			settingsSubmenu?.classList.remove('max-h-screen');
		}
		else
		{
			closeAllMenus(submenus);
			openMenu('largeSubmenu');
			openMenu('settingsSubmenu');
		}
	});
}
