import { Router } from "../../../router";
import { editProfileService } from "../../../services/sidebarService/editProfileService";
import { eraseAccountService } from "../../../services/sidebarService/eraseAccountService"; 
import { showSuccessPopup } from "../../../utils/utils";
import { handleSidebar } from "../sidebarBehavior";

//we are currently working with the editProfileSubmenu -> in the sidebar
export function userChangingInfo()
{
	console.log("entered in userChangingInfo");
	const saveBtnEditProfile = document.getElementById("saveBtnEditProfile");
	saveBtnEditProfile?.addEventListener('click', () => {
		editProfileService();
	});
	eraseAccount();
}

export function eraseAccount()
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
		eraseAccountService();
		await handleSidebar();
		Router.navigate('home');
		showSuccessPopup("You have been disconnected and your account has been deleted", 3500, "popup");
	});
}