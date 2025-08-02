import { Router } from '../router';
import { showSuccessPopup } from '../utils/utils';
// import { hashPassword } from '../../../../srcs/requirements/auth-service/routes/registerRoute.js'
import { showErrorPopup } from '../utils/utils';

// --- form to log in
export function initLogin()
{
	const submitBtn = document.getElementById("connectionBtn") as HTMLButtonElement;
	submitBtn.addEventListener("click", async () => {

		// const status = await fetch('/api/auth/status', { credentials: 'include' })
                    //  .then(res => res.json());

		const statusRes = await fetch('/api/auth/status', { credentials: 'include' });
		const status = await statusRes.json();

		if (status.authenticated)
		{
			showErrorPopup("You are already connected. Firstly disconnect from your account.");
			// Router.navigate('home');
			return;
		}

		const login = (document.getElementById("login") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;
		// const encryptedPassword = await hashPassword(password);
		// you have to encrypt before fetch. One question: while using bcrypt.compare, I will have 2 hashed psswd. Is it a pb using this function that way ?

		fetch('/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: login, password: password }),
		credentials: 'include'
		})
		.then(res => res.json())
		.then(data =>
		{
			localStorage.setItem('login', login);
			const username = localStorage.getItem('login');

			const connectionMsgId = "connectionMsg";
			let connectionMsg = document.getElementById(connectionMsgId) as HTMLParagraphElement | null;
			if (username && data.success === true)
			{
				fetch('/api/auth/info', {
					credentials: 'include'
				})
				.then(res => {
					if (res.ok)
					{
						fetch('/api/auth/infoUser', { credentials: 'include' })
						.then(res => res.json())
						.then(data => {
							console.log("User infos from token:", data.user);
							console.log("data.authenticated:", data.authenticated);
						});

						//redirection to userLogged page
						Router.navigate('userLogged');
						showSuccessPopup("You are logged");
					}
				});
			}
			else if (!connectionMsg)
			{
				connectionMsg = document.createElement("p");
				connectionMsg.id = "connectionMsg";//in order to avoid duplicates
				connectionMsg.classList.add("text-white", "px-1", "py-1", "text-xl");
				connectionMsg.textContent = `Sorry. Your credentials doesn't match`;
				const connectionBtn = document.getElementById("connectionBtn");
				if (connectionBtn)
					connectionBtn.insertAdjacentElement("afterend", connectionMsg);
			}
			
			// console.log("backend data sent :", data);
			// return fetch('/api/userLogged', { credentials: 'include' });
			});
			console.log("login: ", login, "Password:", password);// to erase for PROD
		});
}