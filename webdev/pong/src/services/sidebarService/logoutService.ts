import { Router } from "../../router";
import { manageothersUsersCard } from "../../views/sidebar/profileBtn/manageFriendsSubmenu";

export function initLogout()
{
	const logoutSidebarBtn = document.getElementById('logoutSidebarBtn') as HTMLButtonElement | null;
	logoutSidebarBtn!.addEventListener('click', async () => {
	await fetch('/api/auth/logout', {
		method: 'GET',
		credentials: 'include'
	});
	Router.navigate('home');
	manageothersUsersCard.reset();
	});

}