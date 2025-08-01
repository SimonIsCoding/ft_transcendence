import { Router } from '../router.ts';
import { isValidEmail } from '../utils/utils.ts';
import { showSuccessPopup } from '../utils/utils';
import { showErrorPopup } from '../utils/utils';

// --- form to create account
export function initRegistration()
{
	document.getElementById("createAccountBtn")?.addEventListener("click", async () => {

		const status = await fetch('/api/auth/status', { credentials: 'include' })
					 .then(res => res.json());

		if (status.authenticated)
		{
			showErrorPopup("You are already connected. Firstly disconnect from your account.");
			// Router.navigate('home');
			return;
		}

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
			registrationMsg.classList.add("text-white", "px-1", "py-1", "text-2xl");
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
		Router.navigate('login');
		showSuccessPopup("Your account has been created");

		})
		.catch(err => {
			if (err)
				registrationMsg.textContent = err.message;
		});
	});
}
