export function friendsSubmenuRender():string 
{
	return `
	<div id="friendsSubmenu" class="submenu h-screen w-full absolute top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		<p id="submenuFriendsName" class="font-bold text-center pt-5">Friends List</p>
		<hr class="w-full border-t-1.5 border-black" />
		<button id="addFriendsBtn" class="border text-center font-semibold rounded-full text-base w-70 hover:bg-black hover:text-yellow-400 transition">+ Add Friends</button>
		
		<div>
			<p id="followRequest" class="pl-4 self-start font-semibold text-sm">Follow Request</p>
			<div class="flex flex-col rounded-2xl max-w-md space-y-3 shadow-lg shadow-gray-600 p-4">
				<div class="flex items-center space-x-4">
					<img src="chemin/vers/image.jpg" class="w-13 h-13 rounded-full object-cover border border-black" />

					<div class="flex flex-col">
					<p class="font-bold text-sm text-black">FriendUsername</p>
					<p class="text-sm text-gray-500">email@exemple.com</p>
					</div>
				</div>

				<div class="flex justify-center space-x-3">
					<button class="px-4 py-1 rounded-full border border-black text-black hover:bg-black hover:text-[#fbd11b] transition font-bold text-sm w-40">
					Accept
					</button>
					<button class="px-4 py-1 rounded-full border border-black text-black hover:bg-black hover:text-[#fbd11b] transition font-bold text-sm w-40">
					Ignore
					</button>
				</div>
			</div>
		</div>

		


	</div>
	`
}