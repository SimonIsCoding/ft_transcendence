import { Router } from "../../../router";
// import { editProfileService, GDPRChangeValueService, GDPRCheckService, twofaChangeValueService, twofaCheckService } from "../../../services/sidebarService/editProfileService";
import { editProfileService } from "../../../services/sidebarService/editProfileService";
import { eraseAccountService } from "../../../services/sidebarService/eraseAccountService"; 
import { showSuccessPopup } from "../../../utils/utils";
import { handleSidebar } from "../sidebarBehavior";

//we are currently working with the editProfileSubmenu -> in the sidebar
export function userChangingInfo()
{
	const saveBtnEditProfile = document.getElementById("saveBtnEditProfile");
	saveBtnEditProfile?.addEventListener('click', () => {
		editProfileService();
	});
	twofaToggle();
	GDPRToggle();
	eraseAccount();
}

function twofaToggle()
{
	const toggle = document.getElementById("2FAtoggleSwitch") as HTMLButtonElement;
	const circle = toggle.querySelector("span")!;

	toggle.addEventListener("click", () => {
  	  const enabled = toggle.classList.contains("bg-green-500"); // current UI state
  	  const newEnabled = !enabled; // flip state

	  updateToggleUI(toggle, circle, newEnabled);

  	});
}

function GDPRToggle()
{
	const toggle = document.getElementById("anonymousToggleSwitch") as HTMLButtonElement;
	const circle = toggle.querySelector("span")!;

	toggle.addEventListener("click", async () => {
  	  const enabled = toggle.classList.contains("bg-green-500"); // current UI state
  	  const newEnabled = !enabled; // flip state

	  updateToggleUI(toggle, circle, newEnabled);

	});
}

function updateToggleUI(toggle: HTMLButtonElement, circle: HTMLElement, enabled: boolean) {
	if (enabled) {
		toggle.classList.remove("bg-gray-400");
		toggle.classList.add("bg-green-500");
		circle.classList.add("translate-x-6");
	} else {
		toggle.classList.remove("bg-green-500");
		toggle.classList.add("bg-gray-400");
		circle.classList.remove("translate-x-6");
	}
}

function eraseAccount()
{
	const eraseAccountBtn = document.getElementById("eraseAccountBtn");
	const confirmPopup = document.getElementById("confirmPopup");
	eraseAccountBtn?.addEventListener('click', () => {
		confirmPopup?.classList.remove("hidden");
	});
	
	const popupNo = document.getElementById("popupNo");
	popupNo?.addEventListener('click', () => {
		confirmPopup?.classList.add("hidden");
	});
	
	const popupYes = document.getElementById("popupYes");
	popupYes?.addEventListener('click', async () => {
		await eraseAccountService();
		await handleSidebar();
		Router.navigate('home');
		showSuccessPopup("You have been disconnected and your account has been deleted", 3500, "popup");
	});
}
