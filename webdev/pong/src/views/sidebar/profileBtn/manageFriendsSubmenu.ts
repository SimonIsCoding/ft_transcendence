import { openMenu, closeAllMenus, toggleMenuVisibility } from "../sidebarUtils";
import { getTotalUser } from "../../../services/sidebarService/friendsSubmenuService";

export async function manageOthersFriendsCard()
{
	const othersFriendsDiv = document.getElementById("othersFriendsDiv");
	const totalUser: number = await getTotalUser();
	if (totalUser <= 1)
		othersFriendsDiv?.classList.add("hidden");
	else
	{
		
	}
}

export async function manageCardInit()
{
	await manageOthersFriendsCard();
}

export function seeFriendsList(submenus:NodeListOf<HTMLElement>, dashboardSubmenu:HTMLElement | null, gameHistorySubmenu:HTMLElement | null, friendsSubmenu: HTMLElement | null)
{
	const backBtnFriendsSubmenu = document.getElementById("backBtnFriendsSubmenu");
	backBtnFriendsSubmenu?.addEventListener('click', () => {
		closeAllMenus(submenus);
		toggleMenuVisibility('profileSubmenu', submenus);
	});

	dashboardSubmenu?.classList.add('hidden');
	gameHistorySubmenu?.classList.add('hidden');
	friendsSubmenu?.classList.remove('hidden');
	openMenu('largeSubmenu');
	openMenu('friendsSubmenu');
	manageCardInit();
}