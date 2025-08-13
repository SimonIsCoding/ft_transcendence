import { openMenu, closeAllMenus, toggleMenuVisibility } from "../sidebarUtils";
import { getTotalUser, friendsRequest /*isRequestFriendExists*/, howManyFriendsRequests, alreadyFriends, friendInvitationSent} from "../../../services/sidebarService/friendsSubmenuService";
import { othersUsersCard, friendRequestCard } from "./friendsSubmenuRender";
import { getCurrentUser, getUserLogin/*, getUserMail, getUserPic*/ } from "../../../utils/utils";

interface User {
  id: number;
  login: string;
  mail: string;
  profile_picture: string,
  token: string;
}

async function getRandomOtherUser(): Promise<User>
{
	const login = await getUserLogin();
	const res = await fetch('/api/auth/randomOtherUser', {
		method: 'GET',
		credentials: 'include'
	})

	const data = await res.json();
	if (login && data.login !== login)
		return data;
	else
		return await getRandomOtherUser();
}

async function checkRelationship(currentUser: User, randomUser: User): Promise<Boolean>
{
	return await alreadyFriends(currentUser, randomUser) || await friendInvitationSent(currentUser, randomUser);
}

//You can encapsulate i in a closure or a class. 
export const manageOthersUsersCard = (() => {
  let i = 0;

  async function main()
  {
	const othersUsersDiv = document.getElementById("othersUsersDiv");
	const totalUsers = await getTotalUser();

	if (totalUsers > 1)
	{
		let max: number = totalUsers - 1 > 2 ? 2 : totalUsers - 1;
		if (totalUsers == 2)
			max = 1;
		let randomUser: User;
		let listOthersFriends: User[] = [];
		while (i < max)
		{
			randomUser = await getRandomOtherUser();
			listOthersFriends.push(randomUser);
			if (i > 1)
			{
				while (listOthersFriends[0].login === listOthersFriends[1].login)
				{
					listOthersFriends.pop();
					randomUser = await getRandomOtherUser();
					listOthersFriends.push(randomUser);
				}
			}
			let name: string = `othersUsers_${randomUser.login}_card`;
			const container = document.getElementById("othersUsersCard");
			const currentUser: User = await getCurrentUser();
			const check: Boolean = await checkRelationship(currentUser, randomUser);
			if (check == false && container)
			{
				othersUsersDiv?.classList.remove("hidden");
				container.insertAdjacentHTML("beforeend", othersUsersCard.render(name, randomUser.login));
				othersUsersCard.init(randomUser);
			}
			i++;
		}
    }
  }

  function reset()
  {
	i = 0;
  }

  return { main, reset };
})();

async function addFriendRequestCard(userToFriend: User | null)
{
	const friendRequestDiv = document.getElementById("friendRequestDiv");
	if (userToFriend)
	{
		friendRequestDiv?.classList.remove("hidden");
		document.getElementById("friendRequestContainer")?.insertAdjacentHTML("beforeend", friendRequestCard.render(userToFriend));
		await friendRequestCard.init(userToFriend);
	}
	else
	{
		friendRequestDiv?.classList.add("hidden");
	}
}

export const manageFriendsRequestsCard = (() => {
	let i = 0;

	async function main()
	{
		const nbFriendsRequests = await howManyFriendsRequests();
		while (i < nbFriendsRequests)
		{
			const userToFriend: User | null = await friendsRequest(i);
			await addFriendRequestCard(userToFriend);
			i++;
		}
	}
	function reset()
	{
		i = 0;
	}

  return { main, reset };
})();

/*
Begin space for friendsCard
*/



/*
End space for friendsCard
*/

//What I call Card are the black boxes on the Friend List Submenu
export async function manageCard()
{
	manageFriendsRequestsCard.main();
	manageOthersUsersCard.main();
}

export function seeFriendsList(submenus:NodeListOf<HTMLElement>, dashboardSubmenu:HTMLElement | null, gameHistorySubmenu:HTMLElement | null, friendsSubmenu: HTMLElement | null)
{

	const backBtnFriendsSubmenu = document.getElementById("backBtnFriendsSubmenu");
	backBtnFriendsSubmenu?.addEventListener('click', () => {
		closeAllMenus(submenus);
		toggleMenuVisibility('profileSubmenu', submenus);
	});

	dashboardSubmenu?.classList.add('hidden');
	gameHistorySubmenu?.classList.add('hidden');
	friendsSubmenu?.classList.remove('hidden');
	openMenu('largeSubmenu');
	openMenu('friendsSubmenu');
	manageCard();
}