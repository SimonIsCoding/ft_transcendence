import { Router } from "../../router";
import { manageOthersUsersCard, manageFriendsRequestsCard, manageFriendsCard } from "../../views/sidebar/profileBtn/manageFriendsSubmenu";
import { closeSocket } from "../../views/sidebar/profileBtn/statusSocket";

export function initLogout()
{
	const logoutSidebarBtn = document.getElementById('logoutSidebarBtn') as HTMLButtonElement | null;
	logoutSidebarBtn!.addEventListener('click', async () => {
		await fetch('/api/auth/logout', {
			method: 'GET',
			credentials: 'include'
		});
		manageFriendsRequestsCard.reset();
		manageFriendsCard.reset();
		manageOthersUsersCard.reset();
		closeSocket();
		console.log("closeSocket executed");
		Router.navigate('home');
	});

}