import { Router } from '../router.ts';
import { showSuccessPopup } from '../utils/utils';
import { showErrorPopup } from '../utils/utils';

// --- form to create account
export async function initRegistration(username: string, password: string, mail: string)
{
	const status = await fetch('/api/auth/status', { credentials: 'include' }).then(res => res.json());
	if (status.authenticated)
	{
		Router.navigate('home');
		showErrorPopup("You are already connected. You can't access to the register page.", "popup");
		return;
	}

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
		showSuccessPopup("Your account has been created", 3500, "popup");
	})
	.catch(err => {
		if (err)
			return showErrorPopup(err.message, "popup");
	});
}
