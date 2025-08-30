import { manageOthersUsersCard, manageFriendsRequestsCard, manageFriendsCard } from "../../views/sidebar/profileBtn/manageFriendsSubmenu";

export async function eraseAccountService()
{
	manageFriendsRequestsCard.reset();
	manageFriendsCard.reset();
	manageOthersUsersCard.reset();
	await fetch("/api/auth/me", {
		method: 'DELETE',
		credentials: 'include',
	})
}