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
	const uploadPictureProfileSubmenu = document.getElementById("uploadPictureProfileSubmenu")!;
	const uploadIconEditProfile = document.getElementById('uploadIconEditProfile')!;
	const uploadPictureBtnEditProfile = document.getElementById("uploadPictureBtnEditProfile")!;

	try
	{
		const res = await fetch('/api/auth/me', {
			credentials: 'include'
		});
		if (!res.ok)
			return; // not connected

		const data = await res.json();
		if (data && data.user && data.user.profile_picture && data.user.provider !== 'google')
		{
			preview.src = `https://localhost:4443/${data.user.profile_picture}`;
			previewEdit.src = `https://localhost:4443/${data.user.profile_picture}`;
			preview.classList.remove('hidden');
			previewEdit.classList.remove('hidden');
			uploadIcon.classList.add('hidden');
		}
		else // to load personal pic
		{
			await loadGoogleAvatar(preview, data.user.profile_picture);
			await loadGoogleAvatar(previewEdit, data.user.profile_picture);
			preview.src = data.user.profile_picture;
			previewEdit.src = data.user.profile_picture;
			preview.classList.remove('hidden');
			previewEdit.classList.remove('hidden');

			uploadIcon.classList.add("hidden");
			uploadPictureProfileSubmenu.classList.remove("bg-black");
			uploadIconEditProfile.classList.add("hidden");
			uploadPictureBtnEditProfile.classList.remove("bg-black");
		}
	}
	catch (err)
	{
		console.warn('Error: No image to load:', err);
	}
}

export async function loadGoogleAvatar(imgElement: HTMLImageElement, googleImageUrl: string)
{
	// console.log('in loadGoogleAvatar');

	const tempImg = new Image();
	tempImg.src = `/proxy/avatar?url=${encodeURIComponent(googleImageUrl)}`;

	return new Promise<void>((resolve) => {
		tempImg.onload = () => {
			imgElement.src = tempImg.src;
			imgElement.classList.remove("hidden");
			console.log("Image loaded via proxy:", tempImg.naturalWidth, tempImg.naturalHeight);
			resolve();
		};

		tempImg.onerror = () => {
			imgElement.src = "/basicGoogleImage.png";
			// imgElement.src = `/proxy/avatar?url=${encodeURIComponent(googleImageUrl)}`;
			imgElement.classList.remove("hidden");
			console.warn("Impossible to load Google avatar, fallback applied");
			resolve();
		};
	});
}

// async function loadGoogleAvatar(googleImageUrl: string)
// {
// 	const preview = document.getElementById('previewProfilePicture') as HTMLImageElement;
// 	const previewEdit = document.getElementById('previewProfilePictureEditProfile') as HTMLImageElement;

// 		// console.log(`entered in loadGoogleAvatar`);
// 	try
// 	{
// 		preview.src = googleImageUrl;
// 		previewEdit.src = googleImageUrl;

// 		await new Promise<void>((resolve, reject) => {
// 		preview.onload = () => resolve();
// 		preview.onerror = () => reject(new Error('Failed to load Google avatar'));
// 		});

// 		preview.classList.remove('hidden');
// 		previewEdit.classList.remove('hidden');
// 		// console.log(`finishing try`);

// 	}
// 	catch (err)
// 	{
// 		// console.log(`entered in catch`);
// 		console.warn('Impossible to load Google default image', err);
// 		preview.src = '/basicGoogleImage.png';
// 		previewEdit.src = '/basicGoogleImage.png';
// 		preview.classList.remove('hidden');
// 	}
// }