import { showErrorPopup, isValidEmail, showSuccessPopup, getCurrentUser } from "../../utils/utils";

export async function reloadUserInfo(): Promise<void>
{
	try
	{
		const res = await fetch("/api/auth/info", { credentials: "include" });
		if (!res.ok)
			return console.error("Error fetching user info:", res.status);
		const data = await res.json();
		console.log('in reloadUserInfo, data = ', data);
		console.log(`reloadUserInfo
			id: ${data.user.id},
			login: ${data.user.login},
			email: ${data.user.mail},
			profile_picture: ${data.user.profile_picture}
		`)

		document.getElementById("mailInProfileSubmenu")!.textContent = data.user.mail;
		// you have to reload the mail in Friends list as well 
	}
	catch (err)
	{
		console.error("Network error:", err);
	}
}

export async function editProfileService()
{
	const currentUser = await getCurrentUser();
	console.log(`in editProfileService & currentUser = ${currentUser}`);
	console.log(`Fetched user:
		id: ${currentUser.id},
		login: ${currentUser.login},
		email: ${currentUser.mail},
		profile_picture: ${currentUser.profile_picture}
	`)

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

	if (currentPassword && (!changePassword || currentPassword.trim() === ""))
		return showErrorPopup("You have to insert a new password.", "popup")

	const res = await fetch('/api/auth/changeInfo', {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			login: currentUser.login,
			currentPassword,
			changePassword,
			changeMail
		})
	})
	const backend_answer = await res.json()

	if (res.status === 409)
		showErrorPopup(backend_answer.error, "popup")
	else if (res.ok)// in 200 range
	{
		showSuccessPopup(backend_answer.message, 3500, "popup")
		reloadUserInfo()
	}
}