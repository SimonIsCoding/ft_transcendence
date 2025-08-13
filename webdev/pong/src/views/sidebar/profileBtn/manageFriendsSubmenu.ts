import { openMenu, closeAllMenus, toggleMenuVisibility } from "../sidebarUtils";
import { getTotalUser, friendsRequest /*isRequestFriendExists*/, howManyFriendsRequests, alreadyFriends, friendInvitationSent} from "../../../services/sidebarService/friendsSubmenuService";
import { othersUsersCard, followRequestCard } from "./friendsSubmenuRender";
import { getCurrentUser, getUserLogin/*, getUserMail, getUserPic*/ } from "../../../utils/utils";

interface User {
  id: number;
  login: string;
  mail: string;
  profile_picture: string,
  token: string;
}

//You can encapsulate i in a closure or a class. 
export const manageOthersFriendsCard = (() => {
  let i = 1;

  async function main()
  {
	const othersFriendsDiv = document.getElementById("othersFriendsDiv");
	const othersUsersP = document.getElementById("othersUsersP");
	const totalUsers = await getTotalUser();

	if (totalUsers <= 1)
	{
		othersFriendsDiv?.classList.add("hidden");
		othersUsersP?.classList.add("hidden");
	}
	else
	{
		othersFriendsDiv?.classList.remove("hidden");
		othersUsersP?.classList.remove("hidden");
		let max: number = totalUsers - 1 > 2 ? 2 : totalUsers - 1;
		if (totalUsers == 2)
			max = 1;
		let randomUser: User;
		let listOthersFriends: User[] = [];
		while (i <= max)
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
			const container = document.getElementById("othersFriendsCard");
			const currentUser: User = await getCurrentUser();
			//here you have to check that the randomUser displayed is not beyond the friends AND not beyond the friendsRequests AND hadn't send an invitation yet.
			console.log("before check");
			const check: Boolean = await checkRelationship(currentUser, randomUser);
			console.log("check = ", check);
			if (check == false && container)
			{
				container.insertAdjacentHTML("beforeend", othersUsersCard.render(name, randomUser.login));
				othersUsersCard.init(randomUser);
			}
			i++;
		}
    }
  }

  function reset()
  {
	i = 1;
  }

  return { main, reset };
})();

export async function getRandomOtherUser(): Promise<User>
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

export async function checkRelationship(currentUser: User, randomUser: User): Promise<Boolean>
{
	return await alreadyFriends(currentUser, randomUser) || await friendInvitationSent(currentUser, randomUser);
		// return true;
	// return false;
	//you have to check friendshipStatus
	// + followRequest status
	// if both are not -> then you can send false
}

export async function managefollowRequestCard(userToFriend: User | null)
{
	const followRequestDiv = document.getElementById("followRequestDiv");
	if (userToFriend)
	{
		followRequestDiv?.classList.remove("hidden");
		document.getElementById("followRequestContainer")?.insertAdjacentHTML("beforeend", followRequestCard.render(userToFriend));
		await followRequestCard.init(userToFriend);
	}
	else
	{
		followRequestDiv?.classList.add("hidden");
	}
}









































//What I call Card are the black boxes on the Friend List Submenu
export async function manageCard()
{
	const nbFriendsRequests = await howManyFriendsRequests();
	let i = 0;
	while (i < nbFriendsRequests)
	{
		const userToFriend: User | null = await friendsRequest(i);
		await managefollowRequestCard(userToFriend);
		i++;
	}

	await manageOthersFriendsCard.main();
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