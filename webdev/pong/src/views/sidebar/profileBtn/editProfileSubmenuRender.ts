import type { User } from "../../../config";
import { setCurrentUser } from "../sidebarUtils";

export function editProfileSubmenuRender()
{
	return `
	<div id="editProfileSubmenu" 
		class="submenu max-h-0 absolute left-[64px] top-0 w-48 h-screen bg-[#fbd11b] border border-black flex flex-col overflow-hidden transition-[max-height] duration-450 z-50">

		<!-- Header -->
		<div class="relative p-2 bg-[#fbd11b] border-b border-black py-5">
			<button id="backBtnEditProfileSubmenu"
				class="absolute top-2 left-2 hover:underline underline-offset-2 decoration-black flex items-center group">
				<svg xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4 text-black transition"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<p id="editProfileSubmenuName" class="font-bold text-center">
				Edit Profile
			</p>
		</div>

		<!-- Body -->
		<div class="flex-1 overflow-y-auto py-4 space-y-4">
			<!-- Profile Picture -->
			<input type="file" id="uploadProfilePictureInput" accept="image/*" class="hidden">
			<button id="uploadPictureBtnEditProfile" 
				class="relative w-24 h-24 mx-auto bg-black rounded-full flex items-center justify-center border border-black hover:bg-[#fbd11b] transition">
				<svg id="uploadIconEditProfile" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#fbd11b] group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
				</svg>
				<span class="absolute bottom-0 right-0 bg-[#fbd11b] text-black rounded-full w-5 h-5 flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md">+</span>
				<img id="previewProfilePictureEditProfile" class="absolute w-24 h-24 rounded-full object-cover hidden" />
			</button>

			<!-- Login / alias -->
			<div class="flex flex-col items-center space-y-2">
				<p>Login</p>
				<input id="loginEditProfile" type="text" placeholder="Change login"
					class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
			</div>

			<!-- Mail -->
			<div id="editProfileChangeMail" class="flex flex-col items-center space-y-2">
				<p>Mail</p>
				<input id="changeMailEditProfile" type="text" placeholder="Change email"
					class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
			</div>

			<!-- Password block -->
			<div id="editProfileChangePassword" class="flex flex-col items-center space-y-2">
				<p>Change password</p>
				<input id="currentPasswordEditProfile" type="password" placeholder="Current password"
					class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
				<input id="changePasswordEditProfile" type="password" placeholder="New password"
					class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
				<input id="repeatPasswordEditProfile" type="password" placeholder="Repeat password"
					class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
			</div>

			<!-- 2FA -->
			<div id="editProfile2FA" class="flex flex-col items-center space-y-2">
				<p>Activate 2FA ?</p>
				<button id="2FAtoggleSwitch"
					class="relative w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 transition-colors duration-300">
					<span class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"></span>
				</button>
			</div>

			<!-- Anonymity -->
			<div class="flex flex-col items-center space-y-2">
				<p>Stay anonymous ?</p>
				<button id="anonymousToggleSwitch"
					class="relative w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 transition-colors duration-300">
					<span class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"></span>
				</button>
			</div>

			<!-- Save -->
			<div class="flex justify-center">
				<button id="saveBtnEditProfile" 
					class="font-bold rounded px-3 py-1 text-sm hover:bg-black hover:text-[#fbd11b] border border-black">
					Save
				</button>
			</div>
		</div>

		<!-- Footer: Erase -->
		<div class="p-3 border-t border-black bg-[#fbd11b]">
			<button id="eraseAccountBtn" class="w-full font-bold border rounded px-2 py-1 text-sm hover:bg-red-500">
				Erase account
			</button>
		</div>
	</div>
	${eraseAccountConfirmationPopupRender()}
	        <!-- Hidden 2FA container -->
 	<div id="twofa-container" class="hidden flex-col justify-center items-center w-full space-y-10"><!-- Will be populated by TwoFAController --></div>

	`
}


export function eraseAccountConfirmationPopupRender(): string
{
	return `
	<div id="confirmPopup" class="hidden bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style="background-image: url('/pongBackgroundPlay.png');">
		<div class="bg-white rounded-lg shadow-lg p-6 w-80">
			<p id="popupMessage" class="text-gray-800 text-center">Do you really want to delete your account ?</p>
			<p class="text-gray-800 text-center text-base mb-4">You will lose all your informations</p>
			<div class="flex justify-center space-x-4">
			<button id="popupYes" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Yes</button>
			<button id="popupNo" class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">No</button>
			</div>
		</div>
	</div>
	`
}

export async function loadProfileAndPrefill(): Promise<void> {
  try {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to load profile");

    const data = await res.json();
    const user: User = data.user;
	setCurrentUser(data.user);

    // Login
    const loginInput = document.getElementById("loginEditProfile") as HTMLInputElement | null;
    if (loginInput) loginInput.value = user.login ?? "";

    // Mail
    const mailInput = document.getElementById("changeMailEditProfile") as HTMLInputElement | null;
    const mailLabel = document.getElementById("mailLabel");
    if (mailInput) {
      mailInput.value = user.mail ?? "";
      if (user.provider === "google") {
        mailInput.readOnly = true;
        mailInput.classList.add("bg-gray-200", "cursor-not-allowed", "text-gray-500");
        if (mailLabel) mailLabel.textContent = "Mail (Google-managed)";
      }
    }

    // Profile picture
    const previewImg = document.getElementById("previewProfilePictureEditProfile") as HTMLImageElement | null;
    const uploadIcon = document.getElementById("uploadIconEditProfile");
    if (previewImg && uploadIcon) {
      if (user.profile_picture) {
        previewImg.src = user.profile_picture;
        previewImg.classList.remove("hidden");
        uploadIcon.classList.add("hidden");
      } else {
        previewImg.classList.add("hidden");
        uploadIcon.classList.remove("hidden");
      }
    }

    // 2FA toggle
    const twoFAToggle = document.getElementById("2FAtoggleSwitch") as HTMLElement | null;
    if (twoFAToggle) {
      if (user.is_2fa_activated) {
        twoFAToggle.classList.remove("bg-gray-400");
        twoFAToggle.classList.add("bg-green-500");
        twoFAToggle.querySelector("span")?.classList.add("translate-x-6"); // knob right
      } else {
        twoFAToggle.classList.add("bg-gray-400");
        twoFAToggle.classList.remove("bg-green-500");
        twoFAToggle.querySelector("span")?.classList.remove("translate-x-6"); // knob left
      }
    }

    // GDPR toggle (anonymity)
    const anonToggle = document.getElementById("anonymousToggleSwitch") as HTMLElement | null;
    if (anonToggle) {
      if (user.GDPR_activated) {
        anonToggle.classList.remove("bg-gray-400");
        anonToggle.classList.add("bg-green-500");
        anonToggle.querySelector("span")?.classList.add("translate-x-6");
      } else {
        anonToggle.classList.add("bg-gray-400");
        anonToggle.classList.remove("bg-green-500");
        anonToggle.querySelector("span")?.classList.remove("translate-x-6");
      }
    }

    // Hide password + 2FA section if Google
    if (user.provider === "google") {
      document.getElementById("editProfileChangePassword")?.classList.add("hidden");
      document.getElementById("editProfile2FA")?.classList.add("hidden");
    }

  } catch (err) {
    console.error("Error loading profile:", err);
  }
}
