import type { User } from "../../config";
import { showErrorPopup, isValidEmail, showSuccessPopup } from "../../utils/utils";
import { setCurrentUser, getCurrentUser } from "../../views/sidebar/sidebarUtils";

export async function reloadUserInfo(): Promise<void>
{
	try
	{
		const res = await fetch("/api/auth/me", { credentials: "include" });
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
		setCurrentUser(data.user);
		document.getElementById("mailInProfileSubmenu")!.textContent = data.user.mail;
	}
	catch (err)
	{
		console.error("Network error:", err);
	}
}

function collectCurrentProfile(): Partial<User> & {
  currentPassword?: string;
  changePassword?: string;
  repeatPassword?: string;
} {
  const loginInput = document.getElementById("loginEditProfile") as HTMLInputElement | null;
  const mailInput = document.getElementById("changeMailEditProfile") as HTMLInputElement | null;
  const twoFAToggle = document.getElementById("2FAtoggleSwitch");
  const anonToggle = document.getElementById("anonymousToggleSwitch");

  const currentPasswordInput = document.getElementById("currentPasswordEditProfile") as HTMLInputElement | null;
  const changePasswordInput = document.getElementById("changePasswordEditProfile") as HTMLInputElement | null;
  const repeatPasswordInput = document.getElementById("repeatPasswordEditProfile") as HTMLInputElement | null;

  return {
    login: loginInput?.value ?? "",
    mail: mailInput?.value ?? "",
    is_2fa_activated: twoFAToggle?.classList.contains("bg-green-500") ? 1 : 0,
    GDPR_activated: anonToggle?.classList.contains("bg-green-500") ? 1 : 0,
    currentPassword: currentPasswordInput?.value ?? "",
    changePassword: changePasswordInput?.value ?? "",
    repeatPassword: repeatPasswordInput?.value ?? "",
  };
}



export async function editProfileService(): Promise<void> {
  const currentUser = getCurrentUser();
  if (!currentUser) return showErrorPopup("Current user not loaded.", "popup");

  const current = collectCurrentProfile();

  // --- Validation ---
  if (!current.login || !current.mail) {
    return showErrorPopup("Login and mail cannot be empty.", "popup");
  }

  // Password checks (optional)
  if ((current.currentPassword || current.changePassword || current.repeatPassword) &&
      (current.changePassword !== current.repeatPassword)) {
    return showErrorPopup("The new passwords are not the same.", "popup");
  }

  if (current.currentPassword && !current.changePassword) {
    return showErrorPopup("You have to insert a new password.", "popup");
  }

  if (current.mail && !isValidEmail(current.mail)) {
    return showErrorPopup("The mail format is not valid.", "popup");
  }

  // --- Build changes object ---
  const changes: any = {};
  let requires2FAFlow = false;
  let requiresMailConfirmation = false;

  if (current.login !== currentUser.login) changes.login = current.login;

  // Google users: mail is readonly
  if (currentUser.provider !== "google" && current.mail !== currentUser.mail) {
    changes.mail = current.mail;
    requiresMailConfirmation = true;
  }

  if (current.is_2fa_activated !== currentUser.is_2fa_activated) {
    changes.is_2fa_activated = current.is_2fa_activated;
    if (current.is_2fa_activated === 1) requires2FAFlow = true;
  }

  if (current.GDPR_activated !== currentUser.GDPR_activated) {
    changes.GDPR_activated = current.GDPR_activated;
  }

  // Password change
  if (current.currentPassword && current.changePassword) {
    changes.currentPassword = current.currentPassword;
    changes.changePassword = current.changePassword;
  }

  if (Object.keys(changes).length === 0) {
    return showErrorPopup("No changes detected.", "popup");
  }

  // --- Trigger flows if necessary ---
  if (requires2FAFlow) {
    console.log("You need to start the 2FA enrollment flow.", "popup");
  }

  if (requiresMailConfirmation) {
    console.log("A confirmation email will be sent to your new address.", "popup");
  }

  // --- Send update to backend ---
  try {
    const res = await fetch("/api/auth/me/update", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });

 
	const backend_answer = await res.json();
	
	if (res.status === 409) {
	  showErrorPopup(backend_answer.error, "popup"); // conflict: password/email
	} else if (res.status === 400) {
	  showErrorPopup(backend_answer.error, "popup"); // no changes detected, validation errors
	} else if (!res.ok) {
	  showErrorPopup(backend_answer.error || "Unexpected error", "popup"); // 500 or other errors
	} else {
	  // Success
	  showSuccessPopup(backend_answer.message, 3500, "popup");
	
	  // Update snapshot
	  setCurrentUser({ ...currentUser, ...changes });
	
	  // Reload UI if needed
	  reloadUserInfo();
	}
  } catch (err) {
    console.error(err);
    showErrorPopup("Unexpected error while saving profile.", "popup");
  }
}


export async function twofaCheckService(): Promise<number>
{
	try
	{
		const res = await fetch("/api/auth/me/twofa", { credentials: "include" });
		if (!res.ok)
		{
			console.error("Error fetching twofaCheck:", res.status);
			return -1;
		}
		const data = await res.json();

		const toggle = document.getElementById("2FAtoggleSwitch") as HTMLButtonElement;
		const circle = toggle.querySelector("span")!;
		if (data.is_activated === 1)
		{
			toggle.classList.remove("bg-gray-400");
			toggle.classList.add("bg-green-500");
			circle.classList.add("translate-x-6");
		}
		else
		{
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
	const res = await fetch('/api/auth/me/twofa', {
		method: 'PUT',
		credentials: 'include',
		})
	const backend_answer = await res.json()

	if (res.status === 409)
		showErrorPopup(backend_answer.error, "popup")
}

export async function GDPRCheckService(/*name: string, nb: number*/): Promise<number>
{
	try
	{
		const res = await fetch("/api/auth/me/GDPR", { credentials: "include" });
		if (!res.ok)
		{
			console.error("Error fetching GDPR get:", res.status);
			return -1;
		}
		const data = await res.json();

		const toggle = document.getElementById("anonymousToggleSwitch") as HTMLButtonElement;
		const circle = toggle.querySelector("span")!;
		if (data.is_activated === 1)
		{
			toggle.classList.remove("bg-gray-400");
			toggle.classList.add("bg-green-500");
			circle.classList.add("translate-x-6");
		}
		else
		{
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

export async function GDPRChangeValueService()
{
	const res = await fetch('/api/auth/me/GDPR', {
		method: 'PUT',
		credentials: 'include',
	})
	const backend_answer = await res.json()

	if (res.status === 409)
		showErrorPopup(backend_answer.error, "popup")
	
}

export async function checkFriendHasGDPRActivated(friendId: number)
{
	console.log(`in checkFriendHasGDPRActivated friendId = ${friendId}`);
	const res = await fetch(`/api/auth/friends/${friendId}/GDPR`, { credentials: 'include' })
	const backend_answer = await res.json();

	if (res.status === 409)
		showErrorPopup(backend_answer.error, "popup")
	return (backend_answer.GDPR_activated);
}