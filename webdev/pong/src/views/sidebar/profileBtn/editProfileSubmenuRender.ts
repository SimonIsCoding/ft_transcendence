// export function editProfileSubmenuRender()
// {
// 	return `
// 	<div id="editProfileSubmenu" class="submenu h-screen absolute left-[64px] top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-3.5">
// 	    <button id="backBtnEditProfileSubmenu" class="hover:underline underline-offset-2 decoration-black absolute top-1.5 left-1.5 flex items-center group z-50">
// 			<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// 				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
// 			</svg>
// 			<span class="text-xs font-semibold text-black group-hover:underline ml-1"></span>
// 		</button>
// 		<p id="editProfileSubmenuName" class="font-bold text-center pt-5">Edit Profile</p>
// 		<hr class="border-t-1.5 border-black w-full" />
// 				<input type="file" id="uploadProfilePictureInput" accept="image/*" class="hidden">
// 		<button id="uploadPictureBtnEditProfile" class="relative w-24 h-24 bg-black rounded-full flex items-center justify-center border border-black hover:border-black group hover:bg-[#fbd11b] transition">
// 			<svg id="uploadIconEditProfile" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#fbd11b] group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
// 				<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
// 			</svg>
// 			<span class="absolute bottom-0 right-0 z-20 bg-[#fbd11b] text-black rounded-full w-5 h-5 flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md">+</span>
// 			<img id="previewProfilePictureEditProfile" class="absolute w-24 h-24 rounded-full object-cover hidden" />
// 		</button>

// 		<div id="editProfileChangePasswordMail" class="w-full flex flex-col items-center space-y-3.5">
// 			<p>Change password</p>
// 			<input id="currentPasswordEditProfile" type="password" placeholder="Current password" class="border border-black w-[80%] rounded-xl text-black flex felx-col justify-center text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
// 			<input id="changePasswordEditProfile" type="password" placeholder="Change password" class="border border-black w-[80%] rounded-xl text-black flex felx-col justify-center text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
// 			<input id="repeatPasswordEditProfile" type="password" placeholder="Repeat password" class="border border-black w-[80%] rounded-xl text-black flex felx-col justify-center text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
// 			<hr class="border-t-1.5 border-black w-20"/>
// 			<p>Change mail</p>
// 			<input id="changeMailEditProfile" type="text" placeholder="Change email" class="border border-black w-[80%] rounded-xl text-black flex felx-col justify-center text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
// 			<button id="saveBtnEditProfile" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit border border-black">Save</button>

// 			<hr class="border-t-1.5 border-black w-20"/>
// 			<p>Activate 2FA ?</p>
// 			<button id="2FAtoggleSwitch"
// 				class="relative w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 transition-colors duration-300">
// 				<span class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"></span>
// 			</button>
// 		</div>
// 		<button id="eraseAccountBtn" class="absolute bottom-4 font-bold border rounded px-2 py-1 text-sm hover:bg-red-500 w-fit">Erase account</button>
// 	</div>
// 	${eraseAccountConfirmationPopupRender()}
// 	`
// }

export function editProfileSubmenuRender()
{
	return `
	<div id="editProfileSubmenu" 
		class="submenu max-h-0 absolute left-[64px] top-0 w-48 h-screen bg-[#fbd11b] border border-black flex flex-col overflow-hidden transition-[max-height] duration-450 z-50">

		<div class="relative p-2 bg-[#fbd11b] border-b border-black py-5">
			<button id="backBtnEditProfileSubmenu"
				class="absolute top-2 left-2 hover:underline underline-offset-2 decoration-black flex items-center group">
				<svg xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4 text-black transition"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<p id="editProfileSubmenuName" class="font-bold text-center">
				Edit Profile
			</p>
		</div>

		<div class="flex-1 overflow-y-auto py-4 space-y-3.5">
			<input type="file" id="uploadProfilePictureInput" accept="image/*" class="hidden">

			<button id="uploadPictureBtnEditProfile" 
				class="relative w-24 h-24 mx-auto bg-black rounded-full flex items-center justify-center border border-black hover:bg-[#fbd11b] transition">
				<svg id="uploadIconEditProfile" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#fbd11b] group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
				</svg>
				<span class="absolute bottom-0 right-0 bg-[#fbd11b] text-black rounded-full w-5 h-5 flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md">+</span>
				<img id="previewProfilePictureEditProfile" class="absolute w-24 h-24 rounded-full object-cover hidden" />
			</button>

			<div id="editProfileChangePasswordMail" class="flex flex-col items-center space-y-3.5">
				<p>Change password</p>
				<input id="currentPasswordEditProfile" type="password" placeholder="Current password" class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
				<input id="changePasswordEditProfile" type="password" placeholder="Change password" class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
				<input id="repeatPasswordEditProfile" type="password" placeholder="Repeat password" class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">

				<hr class="border-t border-black w-20"/>
				<p>Change mail</p>
				<input id="changeMailEditProfile" type="text" placeholder="Change email" class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
				<button id="saveBtnEditProfile" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] border border-black">Save</button>

				<hr class="border-t border-black w-20"/>
				<p>Activate 2FA ?</p>
				<button id="2FAtoggleSwitch"
					class="relative w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 transition-colors duration-300">
					<span class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"></span>
				</button>
				<hr class="border-t border-black w-20"/>
				<p>Stay anonymous ?</p>
				<button id="anonymousToggleSwitch"
					class="relative w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 transition-colors duration-300">
					<span class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"></span>
				</button>
			</div>
		</div>

		<div class="p-3 border-t border-black bg-[#fbd11b]">
			<button id="eraseAccountBtn" class="w-full font-bold border rounded px-2 py-1 text-sm hover:bg-red-500">Erase account</button>
		</div>
	</div>
	${eraseAccountConfirmationPopupRender()}
	`
}

export function eraseAccountConfirmationPopupRender(): string
{
	return `
	<div id="confirmPopup" class="hidden bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style="background-image: url('/pongBackgroundPlay.png');">
		<div class="bg-white rounded-lg shadow-lg p-6 w-80">
			<p id="popupMessage" class="text-gray-800 text-center">Do you really want to delete your account ?</p>
			<p class="text-gray-800 text-center text-base mb-4">You will lose all your informations</p>
			<div class="flex justify-center space-x-4">
			<button id="popupYes" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Yes</button>
			<button id="popupNo" class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">No</button>
			</div>
		</div>
	</div>
	`
}