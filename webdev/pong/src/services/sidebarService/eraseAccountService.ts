import { getCurrentUser } from "../../utils/utils";
import { manageOthersUsersCard, manageFriendsRequestsCard, manageFriendsCard } from "../../views/sidebar/profileBtn/manageFriendsSubmenu";

export async function eraseAccountService()
{
	const currentUser = await getCurrentUser();
	console.log(`in eraseAccountService return currentUser = ${currentUser}`);
	console.log("currentUser =", JSON.stringify(currentUser, null, 2));
	
	manageFriendsRequestsCard.reset();
	manageFriendsCard.reset();
	manageOthersUsersCard.reset();
	await fetch('/api/auth/logout', {
		method: 'POST',
		credentials: 'include'
	})
	await fetch("/api/auth/eraseAccount", {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: currentUser.login })
	})
}

// export async function eraseAccountService()
// {
// 	const data = await fetch("/api/auth/info", { credentials: "include" })
// 	const json = await data.json()
// 	const user = json.user
// 	console.log(`eraseAccountService login = ${user.login}`)


// 	const res = await fetch('/api/auth/logout', {
// 		method: 'GET',
// 		credentials: 'include'
// 	})

// 	// await fetch("/api/auth/eraseAccount", {
// 	// 	method: 'POST',
// 	// 	credentials: 'include',
// 	// 	headers: { 'Content-Type': 'application/json' },
// 	// 	body: JSON.stringify({ login: login })
// 	// })
// 	// 	manageFriendsRequestsCard.reset();
// 	// 	manageFriendsCard.reset();
// 	// 	manageOthersUsersCard.reset();
// 	const logoutAnswer = await res.json();
// 	if (logoutAnswer.success === true)
// 	{
// 		fetch("/api/auth/eraseAccount", {
// 				method: 'POST',
// 				credentials: 'include',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({ login: user.login })
// 		})
// 	}
// 	await handleSidebar();
// }