import type { User } from "../../config";
import { showErrorPopup, isValidEmail, showSuccessPopup } from "../../utils/utils";
import { setCurrentUser, getCurrentUser } from "../../views/sidebar/sidebarUtils";
import { TwoFAController } from '../../controllers/twofaController';
import { twofaSidebarView } from '../../views/twofaView';


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
	  return beginEditProfile2FAFlow(currentUser.mail, changes);
  }

  if (requiresMailConfirmation) {
    console.log("A confirmation email will be sent to your new address.");
  }

  // --- Send update to backend ---
  await submitProfileChanges(changes);

}

let form: HTMLElement | null = null;
let twofa: HTMLElement | null = null;

function beginEditProfile2FAFlow(email: string, changes: any) {
  form = document.getElementById('editProfileFormContainer');
  twofa = document.getElementById('twofa-container');

  if (!form || !twofa) {
    console.error("Missing containers for 2FA flow");
    return;
  }

  // Hide form + footer, show 2FA
  form.classList.add('hidden');
  twofa.classList.remove('hidden');

  const expires = new Date(Date.now() + 5 * 60 * 1000).toUTCString(); // 5 minutes from now
  document.cookie = `pending_2fa_edit=true; path=/; Expires=${expires}; SameSite=Strict`;

  if (twofa.querySelector('*') === null) {
    const controller = new TwoFAController(
      email,
    //   'sidebar', // reuse existing flow type
      async () => {
        console.log("2FA success, saving profile...");
		document.cookie = 'pending2FAEdit=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        await submitProfileChanges(changes);
        restoreUI();
      },
      twofa,
      (message, isFinal) => {
        showErrorPopup(message, "popup");
        if (isFinal) {
          // Clear passwords
          (document.getElementById('currentPasswordEditProfile') as HTMLInputElement).value = '';
          (document.getElementById('changePasswordEditProfile') as HTMLInputElement).value = '';
		  document.cookie = 'pending2FAEdit=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

          restoreUI();
        }
      },
	  twofaSidebarView
    );

    twofa.appendChild(controller.init());
  }

  function restoreUI() {
    twofa?.classList.add('hidden');
    form?.classList.remove('hidden');
  }
}

async function submitProfileChanges(changes: any) {
  try {
    const res = await fetch("/api/auth/me", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });

    const backend_answer = await res.json();

    if (res.status === 409) {
      showErrorPopup(backend_answer.error, "popup");
    } else if (res.status === 400) {
      showErrorPopup(backend_answer.error, "popup");
    } else if (!res.ok) {
      showErrorPopup(backend_answer.error || "Unexpected error", "popup");
    } else {
      showSuccessPopup(backend_answer.message, 3500, "popup");

      // Update snapshot
      const currentUser = getCurrentUser();
      if (currentUser) setCurrentUser({ ...currentUser, ...changes });

      reloadUserInfo();
    }
  } catch (err) {
    console.error(err);
    showErrorPopup("Unexpected error while saving profile.", "popup");
  }
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
