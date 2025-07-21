import { playBtnClicked } from '../controllers/menuController';

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
				connectionMsg.classList.add("font-seven", "text-white", "uppercase", "px-1", "py-1", "text-2xl");
				const connectionBtn = document.getElementById("connectionBtn");
				if (connectionBtn)
					connectionBtn.insertAdjacentElement("afterend", connectionMsg);
			}

			if (username && data.success === true)
			{
				connectionMsg.textContent = `User ${login} has been logged in`;

				const playBtnLoginPageId = "playBtnLoginPage";
				let playBtnLoginPage = document.getElementById(playBtnLoginPageId) as HTMLButtonElement | null
				if (!playBtnLoginPage)
				{
					playBtnLoginPage = document.createElement("button");
					playBtnLoginPage.id = "playBtnLoginPage";
					playBtnLoginPage.classList.add("font-seven", "text-white", "uppercase", "px-1", "py-1", "text-5xl", "border", "border-white", "rounded", "px-6", "py-3", "w-90");
					playBtnLoginPage.textContent = "Play";
					const connectionBtn = document.getElementById("connectionBtn");
					if (connectionBtn)
						connectionBtn.insertAdjacentElement("afterend", playBtnLoginPage);
					if (playBtnLoginPage)
						playBtnClicked(playBtnLoginPage);
				}
				let loggedIcon = document.getElementById("loggedIcon") as HTMLAnchorElement | null;
				if (loggedIcon)
				{
					loggedIcon.classList.remove("hidden");
					loggedIcon.title = `Logged as ${username}`;
				}
			}
			else
				connectionMsg.textContent = `Sorry. Your credentials doesn't match`;
			});
		console.log("login: ", login, "Password:", password);// to erase for PROD
	});
}

// --- form to create account
export function initRegistration()
{
	document.getElementById("createAccountBtn")?.addEventListener("click", () => {
		const username = (document.getElementById("newUsername") as HTMLInputElement).value;
		const password = (document.getElementById("newPassword") as HTMLInputElement).value;
		const alias = (document.getElementById("newAlias") as HTMLInputElement).value;

		fetch('/api/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: username, password, alias })
		})
		.then(res => res.json())
		.then(data => {
		console.log("Account created:", data);
		const registrationMsgId = "registrationMsg";
		let registrationMsg = document.getElementById(registrationMsgId) as HTMLParagraphElement | null;
		if (!registrationMsg)
		{
			registrationMsg = document.createElement("p");
			registrationMsg.id = "registrationMsg";
			registrationMsg.classList.add("font-seven", "text-white", "uppercase", "px-1", "py-1", "text-2xl");
			const createAccountBtn = document.getElementById("createAccountBtn");
			if (createAccountBtn)
				createAccountBtn.insertAdjacentElement("afterend", registrationMsg);
		}
		if (data.success === true)
			registrationMsg.textContent = `Account created. Welcome ${username}`;
		else
			registrationMsg.textContent = `The username '${username}' already exists. Try another one.`;
		})
		.catch(err => console.error(err));
	});
}

//to forget for the moment
export function modifyInfo()
{
	fetch('/api/auth/info', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({}),
		credentials: 'include'
		})
		.then(res => res.json())
		.then(data =>
		{
			console.log("You are in info page & data:", data);
	})
}

//to forget for the moment
export async function initInfo(): Promise<boolean>
{
	try
	{
		const res = await fetch('/api/auth/info',
		{
	    	method: 'GET',
	    	credentials: 'include'
		});	
	  	if (!res.ok)
			throw new Error('Not authenticated');	
	  	const data = await res.json();
	  	console.log("User info received:", data);
	  	return true; //  connected
	}
	catch (err)
	{
		console.warn("User not authenticated:", err);
		return false; // not connected
	}
}
