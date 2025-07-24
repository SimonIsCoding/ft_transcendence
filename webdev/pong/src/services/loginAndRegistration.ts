import { Router } from '../router';
import { loginView, chooseTypeOfGameView } from '../views/menu'
import { displayGameOnClick } from '../controllers/menuController'

export function isValidEmail(email: string): boolean
{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function setupPasswordToggle(passwordId: string, toggleBtnId: string, eyeClosedIconId: string, eyeOpenIconId: string): void
{
	const input = document.getElementById(passwordId) as HTMLInputElement | null;
	const toggleBtn = document.getElementById(toggleBtnId);
	const eyeClosed = document.getElementById(eyeClosedIconId);
	const eyeOpened = document.getElementById(eyeOpenIconId);

	if (!input || !toggleBtn || !eyeOpened || !eyeClosed)
		return;

	let isVisible = false;

	toggleBtn.addEventListener("click", () => {
		isVisible = !isVisible;
		input.type = isVisible ? "text" : "password";
		eyeOpened.classList.toggle("hidden", !isVisible);
		eyeClosed.classList.toggle("hidden", isVisible);
	});
}


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
					Router.navigate('play');
					const fullCanva = document.getElementById('fullCanva');
					if (fullCanva)
						fullCanva.innerHTML = chooseTypeOfGameView.render();
						const OneVsOneBtn = document.getElementById('OneVsOneBtn') as HTMLButtonElement | null;
					if (OneVsOneBtn)
						displayGameOnClick(OneVsOneBtn);
				}
			}
			else
				connectionMsg.textContent = `Sorry. Your credentials doesn't match`;

			});
			console.log("login: ", login, "Password:", password);// to erase for PROD
	});
}

export function showSuccessPopup(duration: number = 5000): void {
	const popup = document.getElementById("successPopup");
	if (!popup)
		return;

	popup.classList.remove("hidden");

	setTimeout(() => {
		popup.classList.add("hidden");
	}, duration);
}


// --- form to create account
export function initRegistration()
{
	document.getElementById("createAccountBtn")?.addEventListener("click", () => {
		
		const username = (document.getElementById("newUsername") as HTMLInputElement).value;
		const password = (document.getElementById("newPassword") as HTMLInputElement).value;
		const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;
		const mail = (document.getElementById("newMail") as HTMLInputElement).value.toLowerCase();

		const registrationMsgId = "registrationMsg";
		let registrationMsg = document.getElementById(registrationMsgId) as HTMLParagraphElement | null;
		const createAccountBtn = document.getElementById("createAccountBtn");
		if (!registrationMsg)
		{
			registrationMsg = document.createElement("p");
			registrationMsg.id = "registrationMsg";
			registrationMsg.classList.add("font-seven", "text-white", "px-1", "py-1", "text-2xl");
			if (createAccountBtn)
				createAccountBtn.insertAdjacentElement("afterend", registrationMsg);
		}
		if (confirmPassword !== password)
			return registrationMsg!.textContent = `The passwords are not matching.`;
		if (!username || !password || !confirmPassword || !mail)
			return registrationMsg!.textContent = `All fields has to be filled to create an account.`;
		if (isValidEmail(mail) === false)
			return registrationMsg!.textContent = `The mail format is not correct.`;			
			
		fetch('/api/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: username, password, mail })
		})
		.then(async res => {
		const data = await res.json();

		if (!res.ok)
			throw new Error(data.error);

		console.log("Account created:", data);
		registrationMsg.textContent = `Account created. Welcome ${username}`;

		//redirection on login page
		Router.navigate('login');
		const fullCanva = document.getElementById('fullCanva');
		if (fullCanva)
		{
			fullCanva.innerHTML = loginView.render();
			initLogin();
			setupPasswordToggle("password", "togglePasswordLogin", "eyeIconClosedLogin", "eyeIconOpenedLogin");
			showSuccessPopup();
		}

		})
		.catch(err => {
			if (err)
				registrationMsg.textContent = err.message;
		});
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
