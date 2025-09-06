import { manageOthersUsersCard, manageFriendsRequestsCard, manageFriendsCard } from "../../views/sidebar/profileBtn/manageFriendsSubmenu";
import { manageGameHistorial } from "../gameService";

export async function eraseAccountService()
{
	manageFriendsRequestsCard.reset();
	manageFriendsCard.reset();
	manageOthersUsersCard.reset();
	manageGameHistorial.reset();
	await fetch("/api/auth/me", {
		method: 'DELETE',
		credentials: 'include',
	})
}