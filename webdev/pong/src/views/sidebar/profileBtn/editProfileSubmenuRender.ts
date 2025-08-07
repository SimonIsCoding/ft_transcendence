export function editProfileSubmenuRender()
{
	return `
	<div id="editProfileSubmenu" class="hidden h-screen absolute left-[64px] top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-3.5">
		<button id="backBtnEditProfileSubmenu" class="absolute top-1.5 left-1.5 flex items-center group z-50">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			<span class="text-xs font-semibold text-black group-hover:underline ml-1"></span>
		</button>
		<p id="editProfileSubmenuName" class="font-bold text-center pt-4">Edit Profile</p>
		<hr class="border-t-1.5 border-black w-full" />
	</div>
	`
}