import { Router } from '../router';
import { showSuccessPopup } from '../utils/utils';
// import { hashPassword } from '../../../../srcs/requirements/auth-service/routes/registerRoute.js'

// --- form to log in
export function initLogin()
{
	const submitBtn = document.getElementById("connectionBtn") as HTMLButtonElement;
	submitBtn.addEventListener("click", async () => {

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
		// .then(user => {console.log("Does this shows the user's token? current user:", user);})
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
						// let loggedIcon = document.getElementById("loggedIcon") as HTMLAnchorElement | null;
						// if (loggedIcon)
						// {
						// 	loggedIcon.classList.remove("hidden");
						// 	loggedIcon.title = `Logged as ${username}`;
						// }
						
						//you can also print the data that you receive through the fetch with res.ok
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