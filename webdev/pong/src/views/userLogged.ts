import { receiveProfilePicture } from "../utils/utils";
import { playButton } from "./playButton";
import { userLoggedSidebar } from "./sidebarBehavior";
import { initLogout } from '../services/logoutService';

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

export const userLogged = {
  currentUser: null as User | null,
  isLogin: true,

 render(): string {
	return `
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">
	<div id="successPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
	</div>
	
	${userLoggedSidebar.render()}
	
	${playButton.render()}

	</div>
  `;
  },

  init(): void
  {
	userLoggedSidebar.init();

	loadExistingProfilePicture();
	uploadProfilePicture();

	playButton.init();

	initLogout();
  }
};

export function uploadProfilePicture() : void
{
	const uploadBtn = document.getElementById('uploadPictureBtn');
	const uploadInput = document.getElementById('uploadProfilePictureInput') as HTMLInputElement;
	const preview = document.getElementById('previewProfilePicture') as HTMLImageElement;
	const uploadIcon = document.getElementById('uploadIcon')!;

	uploadBtn!.addEventListener('click', () => {
		uploadInput!.click();
	});

	uploadInput!.addEventListener('change', () => {
		const file = uploadInput.files?.[0];
		if (uploadInput?.files && uploadInput.files[0])
			receiveProfilePicture(uploadInput.files[0]);
		else
			alert('No file selected.');
		if (file && file.type.startsWith('image/'))
		{
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target!.result as string;
				preview.src = result;
				preview.classList.remove('hidden');
				uploadIcon.classList.add('hidden');
			};
			reader.readAsDataURL(file);
		}
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
		if (data && data.profile_picture)
		{
			preview.src = `https://localhost:4443/${data.profile_picture}`;
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
