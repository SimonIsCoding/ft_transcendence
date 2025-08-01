import { receiveProfilePicture } from "../utils/utils";
// import { initLogout } from '../services/logoutService';
import { playButton } from "./playButton";
// import { userLoggedSidebar } from "./sidebarBehavior";
import { handleSidebar } from "./sidebarBehavior";

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

export const userLogged = {
  currentUser: null as User | null,
  isLogin: true,

//   ${userLoggedSidebar.render()}
 render(): string {
	return `
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">
		<div id="successPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>
	
		<div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-1/24">
		</div>
	
	${playButton.render()}

	</div>
  `;
  },

  async init(): Promise<void>
  {
	// userLoggedSidebar.init();
	await handleSidebar();

	// loadExistingProfilePicture();
	// uploadProfilePicture();
	// initLogout();

	playButton.init();

  }
};

export async function uploadProfilePicture() : Promise<void>
{
	const uploadBtn = document.getElementById('uploadPictureBtn');
	const uploadInput = document.getElementById('uploadProfilePictureInput') as HTMLInputElement;
	const preview = document.getElementById('previewProfilePicture') as HTMLImageElement;
	const uploadIcon = document.getElementById('uploadIcon')!;

	return new Promise((resolve, reject) => {
		uploadBtn!.addEventListener('click', () => {
			uploadInput!.click();
		});
	uploadInput!.addEventListener('change', async () => {
	const file = uploadInput.files?.[0];
	if (!file)
	{
		reject();
		return;
	}

	if (file.type.startsWith('image/')) {
		const reader = new FileReader();
		reader.onload = (e) => {
			const result = e.target!.result as string;
			preview.src = result;
			preview.classList.remove('hidden');
			uploadIcon.classList.add('hidden');
		};
		reader.readAsDataURL(file);
	}

	await receiveProfilePicture(file);
	resolve();
	// await loadExistingProfilePicture(); // <== 🔁 nouveau fetch backend
	});
	});
}


export async function loadExistingProfilePicture(): Promise<void>
{
	const preview = document.getElementById('previewProfilePicture') as HTMLImageElement;
	const uploadIcon = document.getElementById('uploadIcon')!;

	try
	{
		// Recover user info
		const res = await fetch('/api/auth/info', {
			credentials: 'include'
		});
		if (!res.ok)
			return; // not connected

		const data = await res.json();
		console.log("in loadExistingProfilePicture(), data: ", data);
		// const res2 = await fetch('/api/auth/uploadProfilePicture', { credentials: 'include'});
		const data2 = await receiveProfilePicture();
		console.log("\n data2 from the receiveProfilePicture:", data2);
		if (data && data.profile_picture)
		{
			preview.src = `https://localhost:4443/${data.profile_picture}`;
			console.log("https://localhost:4443/${data.profile_picture}");
			console.log("https://localhost:4443/",data.profile_picture );
			preview.classList.remove('hidden');
			uploadIcon.classList.add('hidden');
		}
		else
		{
			preview.src = data.profile_picture;
			preview.classList.remove("hidden");
		}
	}
	catch (err)
	{
		console.warn('Error: No image to load:', err);
	}
}
