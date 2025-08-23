export function profileSubmenuRender():string
{
	return `
	<div id="profileSubmenu" class="submenu h-screen absolute left-[64px] top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-3.5">
		<p id="submenuProfileName" class="font-bold text-center pt-5">Profile</p>
		<hr class="border-t-1.5 border-black w-full" />
		<input type="file" id="uploadProfilePictureInput" accept="image/*" class="hidden">
		<div id="uploadPictureProfileSubmenu" class="relative w-24 h-24 bg-black rounded-full flex items-center justify-center border border-transparent hover:border-black group hover:bg-[#fbd11b] transition">
			<svg id="uploadIcon" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#fbd11b] group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
			</svg>
			<img id="previewProfilePicture" class="absolute w-24 h-24 rounded-full object-cover hidden" />
		</div>
		<div class="flex flex-col items-center space-y-1">
			<p id="profileName" class="font-bold">Profile Name</p>
			<p id="mailInProfileSubmenu" class="">contact@mail.com</p>
			<p id="statsInProfileSubmenu" class="text-gray-500 text-[13px] font-bold">12/15 matchs won</p>
		</div>
		<hr class="border-t-1 border-black w-20" />
		<button id="DashboardBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">Dashboard</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="friendsListBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">Friends list</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="gameHistoryBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">Game History</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="editProfileBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">Edit Profile</button>
	</div>
	`
}