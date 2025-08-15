import { Router } from '../router';
import { getCurrentUser, showSuccessPopup } from '../utils/utils';
import { showErrorPopup } from '../utils/utils';
// import { onLoginSuccess } from '../views/sidebar/profileBtn/statusSocket';
import { initStatusSocket } from '../views/sidebar/profileBtn/statusSocket';

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
						// fetch('/api/auth/infoUser', { credentials: 'include' })
						// .then(res => res.json())
						Router.navigate('home');
						showSuccessPopup("You are logged", 3500, "popup");
						// onLoginSuccess();
						const currentUser = await getCurrentUser();
						initStatusSocket(currentUser);
						// initStatusSocket();
					}
				});
			}
			else
				showErrorPopup("Sorry. Your credentials doesn't match", "popup");
			});
		});
}