import { editProfileService } from "../../../services/sidebarService";
import { eraseAccountService } from "../../../services/eraseAccountService"; 

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
	popupYes?.addEventListener('click', () => {
		eraseAccountService();
	});
}