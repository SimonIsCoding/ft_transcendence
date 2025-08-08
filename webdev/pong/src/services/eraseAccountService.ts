import { Router } from "../router";
import { showSuccessPopup } from "../utils/utils";

export async function eraseAccountService()
{
	const login = await fetch("/api/auth/info")
	.then(res => res.json())
	.then(data => { return data.login });

	fetch("/api/auth/eraseAccount", {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: login })
	})
	.then(async res => {
		if (res.status === 200)
		{
			Router.navigate('home');
			showSuccessPopup("You have been disconnected and your account has been deleted", 3500, "popup");
		}
	})
}