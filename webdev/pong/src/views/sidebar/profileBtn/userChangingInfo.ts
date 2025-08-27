import { Router } from "../../../router";
import { editProfileService, twofaChangeValueService, twofaCheckService } from "../../../services/sidebarService/editProfileService";
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
	eraseAccount();
}

async function twofaToggle()
{
	let enabled: Boolean;
	const value = await twofaCheckService();
	if (value === 1)
		enabled = true;
	else
		enabled = false;
	const toggle = document.getElementById("2FAtoggleSwitch") as HTMLButtonElement;
	const circle = toggle.querySelector("span")!;


	toggle.addEventListener("click", () => {
		enabled = !enabled;

		twofaChangeValueService();//changing value in db

		if (enabled)
		{
			toggle.classList.remove("bg-gray-400");
			toggle.classList.add("bg-green-500");
			circle.classList.add("translate-x-6");
			//change value in db

		} else {
			toggle.classList.remove("bg-green-500");
			toggle.classList.add("bg-gray-400");
			circle.classList.remove("translate-x-6");
			//change value in db
		}
	});

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