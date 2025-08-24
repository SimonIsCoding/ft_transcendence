import { getCurrentUser } from '../../../utils/utils.ts';
import { sendFriendRequestOtherUser, updateFriendshipStatus } from '../../../services/sidebarService/friendsSubmenuService.ts';
import { showSuccessPopup } from '../../../utils/utils.ts';
import { renderBackButton } from '../sidebarUtils.ts'

interface User {
  id: number;
  login: string;
  mail: string;
  profile_picture: string,
  token: string;
}

export const friendRequestCard = {
	render(userRequest: User): string {
	return `
	<div id="newRequestsFrom_${userRequest.id}" class="flex flex-col rounded-2xl w-full space-y-1 shadow-base shadow-gray-600 pr-5 pl-5 pt-2 pb-2 bg-black mb-2">
		<div class="flex items-center space-x-2">
			<img id="profilePictureFrom_${userRequest.id}" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			
			<div class="flex flex-col justify-center">
				<p id="requestedFriendUsername_${userRequest.id}" class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
			</div>
		</div>

		<div class="flex justify-center space-x-2">
			<button id="acceptBtn_${userRequest.id}" class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-40">
				Accept
			</button>
			<button id="ignoreBtn_${userRequest.id}" class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-30">
				Ignore
			</button>
		</div>
	</div>
	`;
  },
  async init(userRequest: User)
  {
	if (userRequest)
	{
		const currentUser: User = await getCurrentUser();
		const profilePictureFrom_ = document.getElementById(`profilePictureFrom_${userRequest.id}`) as HTMLImageElement;
		if (userRequest.profile_picture && userRequest.profile_picture.startsWith("https://lh3.googleusercontent.com"))
			profilePictureFrom_.src = `${userRequest.profile_picture}`;
		else
			profilePictureFrom_.src = `https://localhost:4443/${userRequest.profile_picture}`;

		const requestedFriendUsername_ = document.getElementById(`requestedFriendUsername_${userRequest.id}`);
		if (requestedFriendUsername_)
			requestedFriendUsername_.textContent = userRequest.login;

		const acceptBtn = document.getElementById(`acceptBtn_${userRequest.id}`);
		const ignoreBtn = document.getElementById(`ignoreBtn_${userRequest.id}`);
		const newRequests = document.getElementById(`newRequestsFrom_${userRequest.id}`);
		acceptBtn?.addEventListener('click', async () => {
			updateFriendshipStatus(currentUser, userRequest, true);
			fadeOutAndRemove(newRequests);
		});
			ignoreBtn?.addEventListener('click', async () => {
			updateFriendshipStatus(currentUser, userRequest, false);
			fadeOutAndRemove(newRequests);
		});
	}
  }
}

export const friendsCard = {
	render(currentUser: User): string {
	return `
	<div id="friendBox_${currentUser.id}" class="flex flex-col rounded-2xl w-full space-y-5 shadow-base shadow-gray-600 pr-5 pl-5 pt-2 pb-2 bg-black mb-2">
		<div class="flex items-center space-x-2">
			<img id="friendProfilePic_${currentUser.id}" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			<div class="space-x-2">
				<p id="friendUsername_${currentUser.id}" class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
				<p id="friendMail_${currentUser.id}" class="text-sm text-[#fbd11b]">email@exemple.com</p>
				<hr class="w-55"/>
			</div>
			<div id="friendsStatus_${currentUser.id}" class="top-1 right-1 w-3 h-3 bg-red-500 rounded-full border border-black"><button id="Offline" title="Offline"></button></div>
		</div>
	</div>
  `;
  },

  async init(currentUser: User)
  {
	// const friendBox = document.getElementById(`friendBox_${currentUser.id}`);
	const friendImg = document.getElementById(`friendProfilePic_${currentUser.id}`) as HTMLImageElement;
	const friendUsername = document.getElementById(`friendUsername_${currentUser.id}`);
	const friendMail = document.getElementById(`friendMail_${currentUser.id}`);
	// const friendStatus = document.getElementById(`friendsStatus_${currentUser.id}`);
	if (currentUser.profile_picture && currentUser.profile_picture.startsWith("https://lh3.googleusercontent.com"))
		friendImg.src = `${currentUser.profile_picture}`;
	else
		friendImg.src = `https://localhost:4443/${currentUser.profile_picture}`;
	friendUsername!.textContent = currentUser.login;
	friendMail!.textContent = currentUser.mail;
  }
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
	const othersUsersUsername = document.getElementById(`othersUsersUsername_${otherUser.id}`);
	if (othersUsersUsername)
		othersUsersUsername.textContent = otherUser.login;

	const othersUsersPhoto = document.getElementById(`othersUsersPhoto_${otherUser.id}`) as HTMLImageElement;
	if (otherUser.profile_picture && otherUser.profile_picture.startsWith("https://lh3.googleusercontent.com"))
			othersUsersPhoto.src = `${otherUser.profile_picture}`;
		else
			othersUsersPhoto.src = `https://localhost:4443/${otherUser.profile_picture}`;
	
	const addFriendBtn = document.getElementById(`addFriendBtn_${otherUser.id}`);
	const othersUsersCard = document.getElementById(`othersUsers_${otherUser.id}_card`);
	addFriendBtn?.addEventListener('click', async () => {
		fadeOutAndRemove(othersUsersCard);
		showSuccessPopup("Invitation sent", 3500, "popup");
		const currentUser:User = await getCurrentUser();
		sendFriendRequestOtherUser(currentUser, otherUser);
	});
  }
}

export function friendsSubmenuRender():string 
{
	return `
	<div id="friendsSubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5 overflow-y-auto max-h-screen">
		${renderBackButton("backBtnFriendsSubmenu")}
		<p id="submenuFriendsName" class="font-bold text-center pt-5">Friends List</p>
		<hr class="w-full border-t-1.5 border-black" />
		<div id="friendRequestDiv" class="hidden w-[85%]">
			<p id="friendRequest" class="pl-4 self-start font-semibold text-sm">Friend Requests</p>
			<div id="friendRequestCard">
			</div>
		</div>
		<div id="friendsListDiv" class="hidden w-[85%]">
			<p id="friendsListP" class="pl-4 self-start font-semibold text-sm">Friends</p>
			<div id="friendsCard">
			</div>
		</div>
		<div id="othersUsersDiv" class="hidden w-[85%]">
			<p id="othersUsersP" class="pl-4 self-start font-semibold text-sm">Others Users</p>
			<div id="othersUsersCard">
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