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
	// const editProfileChangePasswordMail = document.getElementById('editProfileChangePasswordMail')!;
	const uploadPictureProfileSubmenu = document.getElementById("uploadPictureProfileSubmenu")!;
	const uploadIconEditProfile = document.getElementById('uploadIconEditProfile')!;
	const uploadPictureBtnEditProfile = document.getElementById("uploadPictureBtnEditProfile")!;

	try
	{
		// Recover user info
		const res = await fetch('/api/auth/me', {
			credentials: 'include'
		});
		if (!res.ok)
			return; // not connected

		const data = await res.json();
		if (data && data.user && data.user.profile_picture && data.user.provider !== 'google')
		{
			preview.src = `https://localhost:4443/${data.user.profile_picture}`;
			preview.classList.remove('hidden');
			previewEdit.src = `https://localhost:4443/${data.user.profile_picture}`;
			previewEdit.classList.remove('hidden');
			uploadIcon.classList.add('hidden');
		}
		else // to load personal pic
		{
			await loadGoogleAvatar(preview, data.user.profile_picture);
			await loadGoogleAvatar(previewEdit, data.user.profile_picture);
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

// export async function loadGoogleAvatar(imgElement: HTMLImageElement, googleImageUrl: string)
// {
// 	try
// 	{
// 		await new Promise<void>((resolve, reject) => {
// 			imgElement.onload = () => resolve();
// 			imgElement.onerror = () => reject(new Error('Failed to load Google avatar'));
// 			imgElement.src = googleImageUrl;
// 		});

// 		imgElement.classList.remove('hidden');
// 	}
// 	catch (err)
// 	{
// 		console.warn('Impossible to load Google default image', err);
// 		imgElement.src = '/basicGoogleImage.png';
// 		imgElement.classList.remove('hidden');
// 	}
// }

export async function loadGoogleAvatar(imgElement: HTMLImageElement, googleImageUrl: string)
{
	console.log('in loadGoogleAvatar')
	try {
		await new Promise<void>((resolve, reject) => {
			const timer = setTimeout(() => {
				reject(new Error("Google avatar load timeout"));
			}, 3000);

			imgElement.onload = () => {
				clearTimeout(timer);
				console.log("finishing try", imgElement.naturalWidth, imgElement.naturalHeight);

				if (imgElement.naturalWidth === 0 || imgElement.naturalHeight === 0) {
					console.warn("Google avatar looks invalid, using fallback");
					imgElement.src = "/basicGoogleImage.png";
				}
				else {
					resolve();
				}
			};
			imgElement.onerror = () => {
				clearTimeout(timer);
				reject(new Error("Failed to load Google avatar"));
			};
			imgElement.src = `/proxy/avatar?url=${encodeURIComponent(googleImageUrl)}`;
		});

		imgElement.classList.remove("hidden");
	}
	catch (err)
	{
		console.log('entered in catch');
		console.warn("Impossible to load Google default image", err);
		imgElement.src = "/basicGoogleImage.png";
		imgElement.classList.remove("hidden");
	}
}
