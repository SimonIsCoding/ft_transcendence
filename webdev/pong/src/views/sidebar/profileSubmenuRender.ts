export function profileSubmenuRender():string
{
	return `
	<!-- Hidden submenu -->
	<div id="profileSubmenu" class="submenu h-screen absolute left-1/24 top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		<p id="submenuProfileName" class="font-bold text-center pt-5">Profile</p>
		<hr class="border-t-1.5 border-black w-full" />
		<input type="file" id="uploadProfilePictureInput" accept="image/*" class="hidden">
		<button id="uploadPictureBtn" class="relative w-24 h-24 bg-black rounded-full flex items-center justify-center border border-transparent hover:border-black group hover:bg-[#fbd11b] transition">
			<svg id="uploadIcon" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#fbd11b] group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
			</svg>
			<span class="absolute bottom-0 right-0 z-20 bg-[#fbd11b] text-black rounded-full w-5 h-5 flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md">+</span>
			<img id="previewProfilePicture" class="absolute w-24 h-24 rounded-full object-cover hidden" />
		</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="DashboardBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Dashboard</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="friendsListBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Friends list</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="editProfileBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Edit Profile</button>
	</div>
	`
}