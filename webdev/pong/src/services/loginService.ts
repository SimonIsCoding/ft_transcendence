import { Router } from '../router';
import { /*getCurrentUser, */showSuccessPopup } from '../utils/utils';
import { showErrorPopup } from '../utils/utils';

export interface User {
  id: number;
  login: string;
  mail: string;
  profile_picture: string,
  token: string;
}	

// --- form to log in
export async function initLogin()
{
	//for message popup - in case we are already connected and the user want to access to the login page
	const status = await fetch('/api/auth/status', { credentials: 'include' }).then(res => res.json());
	if (status.authenticated)
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

		const data = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, password }),
			credentials: 'include'
		}).then(res => res.json());
		if (!data.success)
			return showErrorPopup(data.error, "popup");

		// /*const userInfo = await */fetch('/api/auth/info', { credentials: 'include' }).then(res => res.json());

		// Router.navigate('home');
		// showSuccessPopup("You are logged", 3500, "popup");


		if (data.success)
		{
			const user: User = {
				id: data.id,
				login: data.login,
				mail: data.mail,
				profile_picture: data.profile_picture,
				token: data.token
			};
			console.log(`token = ${user.token}`);
			console.log(`token = ${data.token}`);
			// await sendSessionId(user);
			Router.navigate('home');
			showSuccessPopup("You are logged", 3500, "popup");
		}

		// .then(async data =>
		// {
		// 	if (data.success === true)
		// 	{
		// 		const user = await fetch('/api/auth/info', { credentials: 'include' })
		// 		.then(res => res.json());
		// 		if (user)
		// 		{
		// 			sendSessionId(user);
					
		// 		}
		// 	}
		// 	else
		// 		showErrorPopup("Sorry. Your credentials doesn't match", "popup");
		// 	});
		});
}


// export async function createSessionId(currentUser: User)
// {
// 	const isAlreadyConnected = await checkSession(currentUser);
// 	if (isAlreadyConnected === true)
// 		deleteSession(currentUser);
	
// 	sendSessionId(currentUser);
// }

export async function deleteSession(currentUser: User)
{
	fetch('/api/auth/deleteSession', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser }),
		credentials: 'include'
	})
}

export async function checkSession(currentUser: User)
{
	const result = await fetch('/api/auth/checkSession', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser }),
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => { return data.success })
	return result;
}

export async function sendSessionId(currentUser: User)
{
	fetch('/api/auth/sendSessionId', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser }),
		credentials: 'include'
	})
}