import { getUserLogin } from "../../utils/utils";
import { manageOthersFriendsCard } from "../../views/sidebar/profileBtn/manageFriendsSubmenu";

export async function eraseAccountService()
{
	const login = await getUserLogin();

	await fetch('/api/auth/logout', {
		method: 'GET',
		credentials: 'include'
	})
	
	manageOthersFriendsCard.reset();
	await fetch("/api/auth/eraseAccount", {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: login })
	})
}