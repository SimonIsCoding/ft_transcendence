// import { getUserPic/*, getUserLogin, getUserMail*/ } from '../../../utils/utils.ts';
import { renderBackButton } from '../sidebarUtils.ts'

interface User {
  login: string;
//   password: string;
  mail: string;
  profile_picture: string,
  token: string;
}

export function followRequestCard(): string
{
	return `
	<div class="flex flex-col rounded-2xl w-full space-y-1 shadow-base shadow-gray-600 pr-5 pl-5 pt-2 pb-2 bg-black">
		<div class="flex items-center space-x-2">
			<img src="" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			
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
	<div class="flex flex-col rounded-2xl w-full space-y-5 shadow-base shadow-gray-600 pr-5 pl-5 pt-2 pb-2 bg-black">
		<div class="flex items-center space-x-2">
			<img src="" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			<div class="space-x-2">
				<p class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
				<p class="text-sm text-[#fbd11b]">email@exemple.com</p>
				<hr class="w-55"/>
			</div>
			<div id="friendsStatus" class="top-1 right-1 w-3 h-3 bg-red-500 rounded-full border border-black"><button id="Offline" title="Offline"></button></div>
		</div>
	</div>
	`
}

export const othersUsersCard = {
//   currentUser: null as User | null,
//   isLogin: true,

	render(id: string, login: string): string {
	return `
	<div id="${id}" class="flex flex-col rounded-2xl w-full space-y-1 shadow-base shadow-gray-600 px-5 py-2 bg-black my-3">
		<div class="flex items-center space-x-2">
			<img id="othersUsersPhoto_${login}" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			
			<div class="flex flex-col justify-center">
				<p id="othersUsersUsername_${login}" class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
			</div>
		</div>

		<div class="flex justify-center space-x-2">
			<button class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-full">
				Add as a friend
			</button>
		</div>
	</div>
  `;
  },

  async init(otherUser: User): Promise<void>
  {
	//check in db randomly x(=getTotalUsers:number) users
	//if the user is not itself && not beyond the friends && not beyond the requested_friends && not the one already in the section OthersUsers (if there is)
		//display it with name and photo
	const othersUsersUsername = document.getElementById(`othersUsersUsername_${otherUser.login}`);
	if (othersUsersUsername)
		othersUsersUsername.textContent = otherUser.login;

	const othersUsersPhoto = document.getElementById(`othersUsersPhoto_${otherUser.login}`) as HTMLImageElement;
	if (othersUsersPhoto)
  		othersUsersPhoto.src = `https://localhost:4443/${otherUser.profile_picture}`;
	
  }
};

export function friendsSubmenuRender():string 
{
	return `
	<div id="friendsSubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		${renderBackButton("backBtnFriendsSubmenu")}
		<p id="submenuFriendsName" class="font-bold text-center pt-5">Friends List</p>
		<hr class="w-full border-t-1.5 border-black" />
		<div id="followRequestDiv" class="w-[85%]">
			<p id="followRequest" class="pl-4 self-start font-semibold text-sm">Follow Request</p>
			${followRequestCard()}
		</div>
		<div id="friendsListDiv" class="w-[85%]">
			<p id="friendsListP" class="pl-4 self-start font-semibold text-sm">Friends</p>
			${friendsCard()}
		</div>
		<div id="othersFriendsDiv" class="w-[85%]">
			<p id="othersUsersP" class="pl-4 self-start font-semibold text-sm">Others Users</p>
			<div id="othersFriendsCard">
			</div>
		</div>
	</div>
	`
}