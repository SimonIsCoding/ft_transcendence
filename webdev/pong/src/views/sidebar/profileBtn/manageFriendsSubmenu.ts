import type { User } from "../../../config";
import { openMenu, closeAllMenus, toggleMenuVisibility } from "../sidebarUtils";
import { getTotalUser, friendsRequest, howManyFriendsRequests, displayFriend, howManyFriends, getRandomEligibleOtherUser } from "../../../services/sidebarService/friendsSubmenuService";
import { othersUsersCard, friendRequestCard, friendsCard } from "./friendsSubmenuRender";
//import { getCurrentUser } from "../../../utils/utils";

export async function addFriendRequestCard(userToFriend: User | null)
{
	const friendRequestDiv = document.getElementById("friendRequestDiv");
	const existingCard = document.getElementById(`newRequestsFrom_${userToFriend!.id}`);
	if (userToFriend)
	{
		friendRequestDiv?.classList.remove("hidden");
		if (!existingCard)
		{
			document.getElementById("friendRequestCard")?.insertAdjacentHTML("beforeend", friendRequestCard.render(userToFriend));
			await friendRequestCard.init(userToFriend);
		}
		else
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

export async function displayAllFriends(i: number)
{
	const friendsListDiv = document.getElementById("friendsListDiv");
	const userToDisplay = await displayFriend(i);
	if (friendsListDiv)
	{
		// document.getElementById("friendsCard")?.insertAdjacentHTML("beforeend", friendsCard.render(userToDisplay));
		// await friendsCard.init(userToDisplay);
		friendsListDiv.classList.remove("hidden");
		const existingCard = document.getElementById(`friendBox_${userToDisplay.id}`);
		if (!existingCard)
		{
			document.getElementById("friendsCard")?.insertAdjacentHTML("beforeend", friendsCard.render(userToDisplay));
			await friendsCard.init(userToDisplay);
		}
		else
			await friendsCard.init(userToDisplay); // juste mettre à jour (status, image, etc.)
	}
	// else
	// {
	// 	// change the msg bc it is a bit ugly but the logic is there
	// 	// friendsListDiv.classList.remove("hidden");
	// 	// const friendsListP = document.getElementById("friendsListP");
	// 	// friendsListP!.textContent = "No Friends for the moment - You can add new friends below!";
	// }
}

export const manageFriendsCard = (() => {
	let i = 0;

	async function main()
	{
		const nbFriends = await howManyFriends();
		while (i < nbFriends)
		{
			displayAllFriends(i);
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
	othersUsersDiv?.classList.remove("hidden");
	const totalUsers = await getTotalUser();
	//const currentUser: User = await getCurrentUser();

	if (totalUsers > 1)
	{
		let max: number = totalUsers - 1 > 2 ? 2 : totalUsers - 1;
		// if (totalUsers == 2)
			// max = 1;
		console.log(`max user is ${max}`);
		let randomUser: User | null;
		let listOthersFriends: User[] = [];
		let noOtherFriend = 0;
		while (i < max)
		{
			randomUser = await getRandomEligibleOtherUser();
			if (randomUser) listOthersFriends.push(randomUser);
			if (i > 0)
			{
				while (randomUser && listOthersFriends[0].id === listOthersFriends[1].id)
				{
					listOthersFriends.pop();
					randomUser = await getRandomEligibleOtherUser();
					if (randomUser) listOthersFriends.push(randomUser);
					if (j >= totalUsers)
						randomUser = null;
					j++;

				}
			}
			const container = document.getElementById("othersUsersCard");
			const othersUsersP = document.getElementById("othersUsersP");
			if (randomUser && container)
			{
				let name: string = `othersUsers_${randomUser.id}_card`;
				let userId: string = randomUser.id.toString();
				container.insertAdjacentHTML("beforeend", othersUsersCard.render(name, userId));
				othersUsersCard.init(randomUser);
				othersUsersP!.textContent = "Others Users";
				noOtherFriend++;
			}
			else
			{
				if (noOtherFriend == 0)
				{// change the msg bc it is a bit ugly but the logic is there
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