import { openMenu, closeAllMenus, toggleMenuVisibility } from "../sidebarUtils";
import { getTotalUser, friendsRequest, howManyFriendsRequests, displayFriend, howManyFriends, getRandomEligibleOtherUser } from "../../../services/sidebarService/friendsSubmenuService";
import { othersUsersCard, friendRequestCard, friendsCard } from "./friendsSubmenuRender";
import { getCurrentUser } from "../../../utils/utils";

interface User {
  id: number;
  login: string;
  mail: string;
  profile_picture: string,
  token: string;
}

async function addFriendRequestCard(userToFriend: User | null)
{
	const friendRequestDiv = document.getElementById("friendRequestDiv");
	if (userToFriend)
	{
		friendRequestDiv?.classList.remove("hidden");
		document.getElementById("friendRequestCard")?.insertAdjacentHTML("beforeend", friendRequestCard.render(userToFriend));
		await friendRequestCard.init(userToFriend);
	}
	else
	{
		// change the msg bc it is a bit ugly but the logic is there
		friendRequestDiv?.classList.remove("hidden");
		const friendRequest = document.getElementById("friendRequest");
		friendRequest!.textContent = "No Friend Request";
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

async function displayAllFriends(i: number)
{
	console.log("in DisplayAllFriends");
	const friendRequestDiv = document.getElementById("friendRequestDiv");
	const friendsListDiv = document.getElementById("friendsListDiv");
	const currentUser = await displayFriend(i);
	console.log("in DisplayAllFriends & currentUser = ", currentUser);
	if (friendsListDiv)
	{
		friendsListDiv.classList.remove("hidden");
		//si la db dit qu'il y a des amis =>
		document.getElementById("friendsCard")?.insertAdjacentHTML("beforeend", friendsCard.render(currentUser));
		await friendsCard.init(currentUser);
	}
	else
	{
		// change the msg bc it is a bit ugly but the logic is there
		friendRequestDiv?.classList.remove("hidden");
		const friendRequest = document.getElementById("friendRequest");
		friendRequest!.textContent = "No Friend Request";
	}
}

export const manageFriendsCard = (() => {
	let i = 0;

	async function main()
	{
		//${friendsCard()}
		//getCurrentUser and check in friendships db every line where it is displayed
		const nbFriends = await howManyFriends();
		console.log("nbFriends: ", nbFriends);
		console.log("la valeur de i est: ", i);
		while (i < nbFriends)
		{
			// const userToFriend: User | null = await friendsRequest(i);
			// await addFriendRequestCard(userToFriend);
			displayAllFriends(i);
			// await displayFriend(i);
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
End space for friendsCard
*/

//You can encapsulate i in a closure or a class. 
export const manageOthersUsersCard = (() => {
  let i = 0;
  let j = 0;

  async function main()
  {
	const othersUsersDiv = document.getElementById("othersUsersDiv");
	const totalUsers = await getTotalUser();
	const currentUser: User = await getCurrentUser();

	if (totalUsers > 1)
	{
		let max: number = totalUsers - 1 > 2 ? 2 : totalUsers - 1;
		if (totalUsers == 2)
			max = 1;
		let randomUser: User | null;
		let listOthersFriends: User[] = [];
		let noOtherFriend = 0;
		while (i < max)
		{
			randomUser = await getRandomEligibleOtherUser(currentUser);
			// if (randomUser) console.log("in OtherUsers, random user = ", randomUser);
			// console.log("i = ", i);
			listOthersFriends.push(randomUser!);
			if (i > 0)
			{
				while (randomUser && listOthersFriends[0].login === listOthersFriends[1].login)
				{
					listOthersFriends.pop();
					randomUser = await getRandomEligibleOtherUser(currentUser);
					listOthersFriends.push(randomUser!);
					if (j >= totalUsers)
						randomUser = null;
					j++;

				}
				// if (randomUser) console.log("in OtherUsers, random user = ", randomUser);
				// console.log("2nd i = ", i);
			}
			const container = document.getElementById("othersUsersCard");
			const othersUsersP = document.getElementById("othersUsersP");
			if (randomUser && container)
			{
				// console.log("we add OtherUsers container with randomUser = ", randomUser);
				othersUsersDiv?.classList.remove("hidden");
				let name: string = `othersUsers_${randomUser.login}_card`;
				container.insertAdjacentHTML("beforeend", othersUsersCard.render(name, randomUser.login));
				othersUsersCard.init(randomUser);
				othersUsersP!.textContent = "Others Users";
				noOtherFriend++;
			}
			else
			{
				if (noOtherFriend == 0)
				{// change the msg bc it is a bit ugly but the logic is there
					othersUsersDiv?.classList.remove("hidden");
					othersUsersP!.textContent = "No others users to connect with";
				}
			}
			i++;
		}
    }
	else
	{
		const othersUsersP = document.getElementById("othersUsersP");
		othersUsersP!.textContent = "You are the only player registered in the database. You can't connect with no one.";
	}
  }

  function reset()
  {
	i = 0;
	j = 0;
  }

  return { main, reset };
})();

//What I call Card are the black boxes on the Friend List Submenu
export async function manageCard()
{
	manageFriendsRequestsCard.main();
	manageFriendsCard.main();
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