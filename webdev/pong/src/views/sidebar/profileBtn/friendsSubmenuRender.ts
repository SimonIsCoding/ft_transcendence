import { getCurrentUser } from '../../../utils/utils.ts';
import { sendFriendRequestOtherUser } from '../../../services/sidebarService/friendsSubmenuService.ts';
import { showSuccessPopup } from '../../../utils/utils.ts';
import { renderBackButton } from '../sidebarUtils.ts'

interface User {
  id: number;
  login: string;
  mail: string;
  profile_picture: string,
  token: string;
}

export const followRequestCard = {
	render(userRequest: User): string {
	return `
	<div id="newRequestsFrom_${userRequest.login}" class="flex flex-col rounded-2xl w-full space-y-1 shadow-base shadow-gray-600 pr-5 pl-5 pt-2 pb-2 bg-black mb-2">
		<div class="flex items-center space-x-2">
			<img id="profilePictureFrom_${userRequest.login}" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			
			<div class="flex flex-col justify-center">
				<p id="requestedFriendUsername_${userRequest.login}" class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
			</div>
		</div>

		<div class="flex justify-center space-x-2">
			<button id="acceptBtn_${userRequest.login}" class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-40">
				Accept
			</button>
			<button id="ignoreBtn_${userRequest.login}" class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-30">
				Ignore
			</button>
		</div>
	</div>
	`;
  },
  init(userRequest: User)
  {
	if (userRequest)
	{
		const profilePictureFrom_ = document.getElementById(`profilePictureFrom_${userRequest.login}`) as HTMLImageElement;
		profilePictureFrom_.src = `https://localhost:4443/${userRequest.profile_picture}`;

		const requestedFriendUsername_ = document.getElementById(`requestedFriendUsername_${userRequest.login}`);
		if (requestedFriendUsername_)
			requestedFriendUsername_.textContent = userRequest.login;

		const acceptBtn = document.getElementById(`acceptBtn_${userRequest.login}`);
		const ignoreBtn = document.getElementById(`ignoreBtn_${userRequest.login}`);
		const newRequests = document.getElementById(`newRequestsFrom_${userRequest.login}`);
		acceptBtn?.addEventListener('click', async () => {
			fadeOutAndRemove(newRequests);
			//send to backend that they are friends
			//remove line from db
		});
			ignoreBtn?.addEventListener('click', async () => {
			fadeOutAndRemove(newRequests);
			//remove line from db
			
		});
	}
  }
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
	render(id: string, login: string): string {
	return `
	<div id="${id}" class="flex flex-col rounded-2xl w-full space-y-1 shadow-base shadow-gray-600 px-5 py-2 bg-black mb-3 opacity-100 transition-opacity">
		<div class="flex items-center space-x-2">
			<img id="othersUsersPhoto_${login}" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			
			<div class="flex flex-col justify-center">
				<p id="othersUsersUsername_${login}" class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
			</div>
		</div>

		<div class="flex justify-center space-x-2">
			<button id="addFriendBtn_${login}" class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-full">
				Add as a friend
			</button>
		</div>
	</div>
  `;
  },

  async init(otherUser: User): Promise<void>
  {
	const othersUsersUsername = document.getElementById(`othersUsersUsername_${otherUser.login}`);
	if (othersUsersUsername)
		othersUsersUsername.textContent = otherUser.login;

	const othersUsersPhoto = document.getElementById(`othersUsersPhoto_${otherUser.login}`) as HTMLImageElement;
	if (othersUsersPhoto)
  		othersUsersPhoto.src = `https://localhost:4443/${otherUser.profile_picture}`;
	
	const addFriendBtn = document.getElementById(`addFriendBtn_${otherUser.login}`);
	const othersUsersCard = document.getElementById(`othersUsers_${otherUser.login}_card`);
	addFriendBtn?.addEventListener('click', async () => {
		fadeOutAndRemove(othersUsersCard);
		showSuccessPopup("Invitation sent", 3500, "popup");
		//you have to call the backend to change status about friendList
		// you have to send OtherUser (which is user_b) and currentUser (that you can have with 'api/auth/info') => for both you have to send the whole Promise
		const currentUser:User = await getCurrentUser();
		sendFriendRequestOtherUser(currentUser, otherUser);
	});
  }
}

export function friendsSubmenuRender():string 
{
	return `
	<div id="friendsSubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		${renderBackButton("backBtnFriendsSubmenu")}
		<p id="submenuFriendsName" class="font-bold text-center pt-5">Friends List</p>
		<hr class="w-full border-t-1.5 border-black" />
		<div id="followRequestDiv" class="hidden w-[85%]">
			<p id="followRequest" class="pl-4 self-start font-semibold text-sm">Follow Request</p>
			<div id="followRequestContainer">
			</div>
		</div>
		<div id="friendsListDiv" class="w-[85%]">
			<p id="friendsListP" class="pl-4 self-start font-semibold text-sm">Friends</p>
			<div id="friendsCard">
				${friendsCard()}
			</div>
		</div>
		<div id="othersFriendsDiv" class="w-[85%]">
			<p id="othersUsersP" class="pl-4 self-start font-semibold text-sm">Others Users</p>
			<div id="othersFriendsCard">
			</div>
		</div>
	</div>
	`
}

export function fadeOutAndRemove(el: HTMLElement | null, durationClass = 'duration-750'): void
{
	if (!el)
		return;

	el.classList.remove('hidden', 'opacity-0');
	el.classList.add('opacity-100', 'transition-opacity', 'duration-1000', 'ease-out');

	void el.offsetWidth;
	el.classList.remove('opacity-100');
	el.classList.add('opacity-0');
	const durationMs = durationClass === 'duration-1000' ? 1000 : 300;
	setTimeout(() => el.remove(), durationMs + 20);
}