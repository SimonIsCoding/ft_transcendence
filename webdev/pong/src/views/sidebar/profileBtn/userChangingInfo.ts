import { editProfileService } from "../../../services/sidebarService";

//we are currently working with the editProfileSubmenu -> in the sidebar
export function userChangingInfo()
{
	console.log("entered in userChangingInfo");
	// editProfileService();
	//call the backend to know what is the current password -> unhashed it
	const saveBtnEditProfile = document.getElementById("saveBtnEditProfile");
	saveBtnEditProfile?.addEventListener('click', () => {
		editProfileService();
	});
}