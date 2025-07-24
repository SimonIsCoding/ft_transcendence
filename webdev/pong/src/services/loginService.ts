import { playDomLoaded } from '../controllers/menu/playController'
import { showSuccessPopup } from '../utils/utils';

// --- form to log in
export function initLogin()
{
	const submitBtn = document.getElementById("connectionBtn") as HTMLButtonElement;
	submitBtn.addEventListener("click", () => {

		const login = (document.getElementById("login") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;

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
			if (!connectionMsg)
			{
				connectionMsg = document.createElement("p");
				connectionMsg.id = "connectionMsg";
				connectionMsg.classList.add("font-seven", "text-white", "px-1", "py-1", "text-2xl");
				const connectionBtn = document.getElementById("connectionBtn");
				if (connectionBtn)
					connectionBtn.insertAdjacentElement("afterend", connectionMsg);
			}

			if (username && data.success === true)
			{
				let loggedIcon = document.getElementById("loggedIcon") as HTMLAnchorElement | null;
				if (loggedIcon)
				{
					loggedIcon.classList.remove("hidden");
					loggedIcon.title = `Logged as ${username}`;
					
					//redirection to play page
					showSuccessPopup("You are logged");
					playDomLoaded();
				}
			}
			else
				connectionMsg.textContent = `Sorry. Your credentials doesn't match`;

			});
			console.log("login: ", login, "Password:", password);// to erase for PROD
	});
}