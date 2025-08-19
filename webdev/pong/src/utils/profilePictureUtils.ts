import { receiveProfilePicture } from "./utils";

export async function uploadProfilePicture() : Promise<void>
{
	const uploadBtn = document.getElementById('uploadPictureBtnEditProfile');
	const uploadInput = document.getElementById('uploadProfilePictureInput') as HTMLInputElement;
	const preview = document.getElementById('previewProfilePicture') as HTMLImageElement;
	const previewEdit = document.getElementById('previewProfilePictureEditProfile') as HTMLImageElement;
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

	if (file.type.startsWith('image/'))
	{
		const reader = new FileReader();
		reader.onload = (e) => {
			const result = e.target!.result as string;
			preview.src = result;
			preview.classList.remove('hidden');
			previewEdit.src = result;
			previewEdit.classList.remove('hidden');
			uploadIcon.classList.add('hidden');
		};
		reader.readAsDataURL(file);
	}

	await receiveProfilePicture(file);
	resolve();
	});
	});
}

export async function loadExistingProfilePicture(): Promise<void>
{
	const preview = document.getElementById('previewProfilePicture') as HTMLImageElement;
	const previewEdit = document.getElementById('previewProfilePictureEditProfile') as HTMLImageElement;
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
		if (data && data.user && data.user.profile_picture)
		{
			preview.src = `https://localhost:4443/${data.user.profile_picture}`;
			preview.classList.remove('hidden');
			previewEdit.src = `https://localhost:4443/${data.user.profile_picture}`;
			previewEdit.classList.remove('hidden');
			uploadIcon.classList.add('hidden');
		}
		else // to load personal pic
		{
			preview.src = data.user.profile_picture;
			preview.classList.remove("hidden");
			previewEdit.src = data.user.profile_picture;
			previewEdit.classList.remove("hidden");
		}
	}
	catch (err)
	{
		console.warn('Error: No image to load:', err);
	}
}
