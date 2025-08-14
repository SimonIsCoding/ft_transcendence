import { getCurrentUser } from "../../utils/utils";
import { manageOthersUsersCard, manageFriendsRequestsCard, manageFriendsCard } from "../../views/sidebar/profileBtn/manageFriendsSubmenu";

export async function eraseAccountService()
{
	const currentUser = await getCurrentUser();

	await fetch('/api/auth/logout', {
		method: 'GET',
		credentials: 'include'
	})
	
	manageFriendsRequestsCard.reset();
	manageFriendsCard.reset();
	manageOthersUsersCard.reset();
	await fetch("/api/auth/eraseAccount", {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: currentUser.login })
	})
}