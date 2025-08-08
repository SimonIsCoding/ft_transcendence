export async function isConnected(): Promise<boolean>
{
	const res = await fetch('/api/auth/status', {
			method: 'GET',
  			credentials: 'include' 
	})

	const data = await res.json();
	if (data.authenticated === true)
	{
		console.log("data.authenticated = ", data.authenticated);
		return true;
	}
	console.log("data.authenticated = ", data.authenticated);
	return false;
}

export async function getUserInfo()
{
	fetch("/api/auth/info")
	.then(res => res.json())
	.then(data => {
		const profileName = document.getElementById("profileName");
		if (profileName && data.login)
			profileName.textContent = data.login;
		else
			profileName!.textContent = `Profile Name`;

		const mail = document.getElementById("mailInProfileSubmenu");
		if (mail && data.mail)
			mail.textContent = data.mail;
		else
			mail!.textContent = `contact@mail.com`;

		//here we should add the stats of the matchs won
		// but we have to fecth another db which is the stats one
		// const stats = document.getElementById("statsInProfileSubmenu");
		// if (stats && )
		// 	stats.textContent = ;
		// else
		// 	stats!.textContent = `12/15 matchs won`;

		const playerNameDashboard = document.getElementById("playerNameDashboard");
		if (playerNameDashboard && data.login)
			playerNameDashboard.textContent = data.login;
		else
			playerNameDashboard!.textContent = "Username";
	});
}

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

import { showErrorPopup, isValidEmail, showSuccessPopup } from "../utils/utils";

export async function editProfileService()
{
	const login = await fetch("/api/auth/info")
	.then(res => res.json())
	.then(data => { return data.login });
	console.log("login is ==== ", login);

	const currentPassword = (document.getElementById("currentPasswordEditProfile") as HTMLInputElement).value;
	const changePassword = (document.getElementById("changePasswordEditProfile") as HTMLInputElement).value;
	const repeatPassword = (document.getElementById("repeatPasswordEditProfile") as HTMLInputElement).value;
	const changeMail = (document.getElementById("changeMailEditProfile") as HTMLInputElement).value;
	
	if (changePassword !== repeatPassword)
	{
		showErrorPopup("The new passwords are not the same.", "successPopup");
		showErrorPopup("The new passwords are not the same.", "oneVsOneAreaPopup");
		showErrorPopup("The new passwords are not the same.", "oneVsAIAreaPopup");
		return ; //depending which page is shown - is a bit repetitive but well - the popup could be put outside the <main> tag as well
	}

	if ((changeMail && changeMail.trim() !== "") && isValidEmail(changeMail) === false)
	{
		showErrorPopup("The mail format is not valid.", "successPopup");
		showErrorPopup("The mail format is not valid.", "oneVsOneAreaPopup");
		showErrorPopup("The mail format is not valid.", "oneVsAIAreaPopup");
		return ;
	}

	console.log("entered in editProfileService <=> fetch on /changeInfo");
	console.log("currentPassword = ", currentPassword);
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
					showErrorPopup("Your current password is not matching the real password." , "successPopup");
					break;
				case 'Email already used':
					showErrorPopup("Email already used.", "successPopup");
					break;
			}
		}
		else if (res.status === 200)
		{
			console.log("res.status === 200");
			if (backend_answer.message === "Password & mail modified")
				showSuccessPopup("Password & mail modified", 3500, "successPopup");
			else if (backend_answer.message === "Password modified")
				showSuccessPopup("Password modified", 3500, "successPopup");
			else if (backend_answer.message === "Mail modified")
				showSuccessPopup("Mail modified", 3500, "successPopup");
			//recall backend to reload user info
			reloadUserInfo();
		}
	})
}