import { renderBackButton } from './sidebarUtils.ts'
// <button id="addFriendsBtn" class="border text-center font-semibold rounded-full text-base w-70 hover:bg-black hover:text-yellow-400 transition">+ Add Friends</button>

export function followRequestCard(): string
{
	return `
	<div class="flex flex-col rounded-2xl max-full space-y-5 shadow-base shadow-gray-600 pr-5 pl-5 pt-2 pb-2 bg-black">
		<div class="flex items-center space-x-2">
			<img src="chemin/vers/image.jpg" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			
			<div class="flex flex-col justify-center">
				<p class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
				<p class="text-sm text-[#fbd11b]">email@exemple.com</p>
			</div>
		</div>

		<div class="flex justify-center space-x-2">
			<button class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-40">
				Accept
			</button>
			<button class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-30">
				Ignore
			</button>
		</div>
	</div>
	`
}

export function friendsCard(): string
{
	return `
	<div class="flex flex-col rounded-2xl max-full space-y-5 shadow-base shadow-gray-600 pr-3 pl-3 pt-2 pb-2 bg-black">
		<div class="flex items-center space-x-2">
			<img src="chemin/vers/image.jpg" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			
			<div class="space-x-2">
				<p class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
				<p class="text-sm text-[#fbd11b]">email@exemple.com</p>
			</div>
		</div>
	</div>
	`
}

export function othersFriendsCard(): string
{
	return `
	
	`
}

export function friendsSubmenuRender():string 
{
	return `
	<div id="friendsSubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		${renderBackButton("backBtnFriendsSubmenu")}
		<p id="submenuFriendsName" class="font-bold text-center pt-5">Friends List</p>
		<hr class="w-full border-t-1.5 border-black" />
		<div id="followRequestDiv">
			<p id="followRequest" class="pl-4 self-start font-semibold text-sm">Follow Request</p>
			${followRequestCard()}
		</div>
		<div id="friendsListDiv">
			${friendsCard()}
		</div>
		<div id="othersFriendsDiv">
			${othersFriendsCard()}
		</div>
	</div>
	`
}