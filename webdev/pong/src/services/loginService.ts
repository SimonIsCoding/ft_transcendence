import { Router } from '../router';
import { getCurrentUser, showSuccessPopup } from '../utils/utils';
import { showErrorPopup } from '../utils/utils';
// import { manageFriendsCard, manageFriendsRequestsCard, manageOthersUsersCard } from '../views/sidebar/profileBtn/manageFriendsSubmenu';
// import { onLoginSuccess } from '../views/sidebar/profileBtn/statusSocket';
import { /*closeSocket, */initStatusSocket } from '../views/sidebar/profileBtn/statusSocket';
// import { isConnected } from './sidebarService/utilsSidebarService';
// import { } 

interface User {
  id : number;
  login: string;
//   password: string;
  mail: string;
  profile_picture: string;
  token: string;
}


// --- form to log in
export async function initLogin()
{
	//for message popup - in case we are already connected and the user want to access to the login page
	// const status = await fetch('/api/auth/status', { credentials: 'include' }).then(res => res.json());
	// if (status.authenticated)
	const currentUser = await getCurrentUser();
	console.log(`currentUser.id = ${currentUser.id}`);
	if (currentUser.id)
	{
		Router.navigate('home');
		showErrorPopup("You are already connected. You can't access to the login page.", "popup");
		return;
	}

	const submitBtn = document.getElementById("connectionBtn") as HTMLButtonElement;
	submitBtn.addEventListener("click", async () => {

		const login = (document.getElementById("login") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;

		if ((!login && login.trim() === "") || (!password && password.trim() === ""))
			return showErrorPopup("You need a login and a password to log in", "popup");

		fetch('/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: login, password: password }),
		credentials: 'include'
		})
		.then(res => res.json())
		.then(data =>
		{
			if (data.success === true)
			{
				fetch('/api/auth/info', {
					credentials: 'include'
				})
				.then(async res => {
					if (res.ok)
					{
						const currentUser: User = await getCurrentUser();
						// const forceLogout = await fetch('/api/auth/forceLogout', {
						// 	method: 'POST',
						// 	headers: { 'Content-Type': 'application/json' },
						// 	body: JSON.stringify({ userId2: currentUser.id }),
						// 	credentials: 'include'
						// })
						// const forceIt = await forceLogout.json();
						// console.log(`forceIt = ${forceIt.success}`);
						// if (forceIt.success === true)
						// {
						// 	console.log("entered in forceIt condition");
						// 	await fetch('/api/auth/logout', {
						// 		method: 'GET',
						// 		credentials: 'include'
						// 	});
						// 	manageFriendsRequestsCard.reset();
						// 	manageFriendsCard.reset();
						// 	manageOthersUsersCard.reset();
						// 	closeSocket();
						// 	console.log("closeSocket executed");
						// 	await isConnected();
						// 	Router.navigate('home');
						// }
						// else
						// {
						// }
							initStatusSocket(currentUser);
							showSuccessPopup("You are logged", 3500, "popup");
							Router.navigate('home');

					}
				});
			}
			else
				showErrorPopup("Sorry. Your credentials doesn't match", "popup");
			});
		});
}