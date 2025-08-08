import { showErrorPopup, isValidEmail, showSuccessPopup } from "../../utils/utils";

export async function reloadUserInfo(): Promise<void>
{
	try
	{
		const res = await fetch("/api/auth/info", {
			credentials: "include"
		});

		if (!res.ok)
			return console.error("Error fetching user info:", res.status);

		const data = await res.json();
		document.getElementById("mailInProfileSubmenu")!.textContent = data.mail;
		// you have to reload the mail in Friends list as well 
	}
	catch (err)
	{
		console.error("Network error:", err);
	}
}

export async function editProfileService()
{
	const login = await fetch("/api/auth/info")
	.then(res => res.json())
	.then(data => { return data.login });

	const currentPassword = (document.getElementById("currentPasswordEditProfile") as HTMLInputElement).value;
	const changePassword = (document.getElementById("changePasswordEditProfile") as HTMLInputElement).value;
	const repeatPassword = (document.getElementById("repeatPasswordEditProfile") as HTMLInputElement).value;
	const changeMail = (document.getElementById("changeMailEditProfile") as HTMLInputElement).value;
	
	if ((!changeMail && changeMail.trim() === "") && (!currentPassword && currentPassword.trim() === ""))
		return showErrorPopup("You have to fill more fields to update your informations.", "popup");

	if (changePassword !== repeatPassword)
		return showErrorPopup("The new passwords are not the same.", "popup");

	if ((changeMail && changeMail.trim() !== "") && isValidEmail(changeMail) === false)
		return showErrorPopup("The mail format is not valid.", "popup");

	fetch('/api/auth/changeInfo', {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: login, currentPassword: currentPassword, changePassword: changePassword, changeMail: changeMail })
	})
	.then(async res => {
		const backend_answer = await res.json();
		if (res.status === 409)
		{
			switch (backend_answer.error)
			{
				case 'Current password is not matching the real password.':
					showErrorPopup("Your current password is not matching the real password." , "popup");
					break;
				case 'Email already used':
					showErrorPopup("Email already used.", "popup");
					break;
			}
		}
		else if (res.status === 200)
		{
			if (backend_answer.message === "Password & mail modified")
				showSuccessPopup("Password & mail modified", 3500, "popup");
			else if (backend_answer.message === "Password modified")
				showSuccessPopup("Password modified", 3500, "popup");
			else if (backend_answer.message === "Mail modified")
				showSuccessPopup("Mail modified", 3500, "popup");
			reloadUserInfo();
		}
	})
}