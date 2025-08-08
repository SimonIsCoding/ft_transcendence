import { editProfileService } from "../../../services/sidebarService";

//we are currently working with the editProfileSubmenu -> in the sidebar
export function userChangingInfo()
{
	console.log("entered in userChangingInfo");
	const saveBtnEditProfile = document.getElementById("saveBtnEditProfile");
	saveBtnEditProfile?.addEventListener('click', () => {
		editProfileService();
	});
}