import { loginDomLoaded } from '../controllers/menu/loginController.ts';
import { isValidEmail } from '../utils/utils.ts';
import { showSuccessPopup } from '../utils/utils';

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

		//redirection on login page
		loginDomLoaded();
		showSuccessPopup("Your account has been created");

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
