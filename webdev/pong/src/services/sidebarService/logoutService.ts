import { Router } from "../../router";
import { showSuccessPopup } from "../../utils/utils";
import { manageOthersUsersCard, manageFriendsRequestsCard, manageFriendsCard } from "../../views/sidebar/profileBtn/manageFriendsSubmenu";

export function initLogout()
{
	const logoutSidebarBtn = document.getElementById('logoutSidebarBtn') as HTMLButtonElement | null;
	logoutSidebarBtn!.addEventListener('click', async () => {
	await fetch('/api/auth/logout', {
		method: 'GET',
		credentials: 'include'
	});
	Router.navigate('home');
	manageFriendsRequestsCard.reset();
	manageFriendsCard.reset();
	manageOthersUsersCard.reset();
	showSuccessPopup("Logged out", 3500, "popup");
	});

}