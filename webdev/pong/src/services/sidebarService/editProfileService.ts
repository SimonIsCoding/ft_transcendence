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

export async function twofaCheckService(): Promise<number>
{
	try
	{
		const res = await fetch("/api/auth/twofaCheck", { credentials: "include" });
		if (!res.ok)
		{
			console.error("Error fetching twofaCheck:", res.status);
			return -1;
		}
		const data = await res.json();
		console.log(`data.is_activated = ${data.is_activated}`);

		const toggle = document.getElementById("2FAtoggleSwitch") as HTMLButtonElement;
		const circle = toggle.querySelector("span")!;
		console.log(`in /api/auth/twofaCheck`)
		console.log(`data.is_activated = ${data.is_activated}`)
		if (data.is_activated === 1)
		{
			console.log(`entered in true`)
			toggle.classList.remove("bg-gray-400");
			toggle.classList.add("bg-green-500");
			circle.classList.add("translate-x-6");
		}
		else
		{
			console.log(`entered in false`)
			toggle.classList.remove("bg-green-500");
			toggle.classList.add("bg-gray-400");
			circle.classList.remove("translate-x-6");
		}
		return data.is_activated;
	}
	catch (err)
	{
		console.error("Network error:", err);
		return -1;
	}
}

export async function twofaChangeValueService()
{
	const currentUser = await getCurrentUser();
	const res = await fetch('/api/auth/twofaChangeValue', {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			userId: currentUser.id,
		})
	})
	const backend_answer = await res.json()

	if (res.status === 409)
		showErrorPopup(backend_answer.error, "popup")
	
}