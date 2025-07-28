import { Router } from '../router';
import { showSuccessPopup } from '../utils/utils';

// --- form to log in
export function initLogin()
{
	const submitBtn = document.getElementById("connectionBtn") as HTMLButtonElement;
	submitBtn.addEventListener("click", async () => {

		const login = (document.getElementById("login") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;

		// const res = await fetch("http://localhost:3001/api/private/info", { credentials: "include" });
		// const user = await res.json();

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
				let loggedIcon = document.getElementById("loggedIcon") as HTMLAnchorElement | null;
				if (loggedIcon)
				{
					loggedIcon.classList.remove("hidden");
					loggedIcon.title = `Logged as ${username}`;
				}

				//redirection to userLogged page
				Router.navigate('userLogged');
				showSuccessPopup("You are logged");
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

			});
			console.log("login: ", login, "Password:", password);// to erase for PROD
	});
}