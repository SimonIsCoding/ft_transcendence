import { getCurrentUser } from "../../utils/utils";
import { addFriendRequestCard, displayAllFriends } from "../../views/sidebar/profileBtn/manageFriendsSubmenu";

interface User {
  id: number;
  login: string;
  mail: string;
  profile_picture: string,
  token: string;
}

//function to check how many user there is in the db
export async function getTotalUser()
{
	const res = await fetch('/api/auth/countTotalUsers', {
		method: 'GET',
		credentials: 'include'
	})
	const data = await res.json();//issue
	return data;
}

export async function getUserById(userId: number): Promise<User> {
  const user: User = await fetch(`/api/auth/friends/${userId}`, {
    method: 'GET',
    credentials: 'include'
  })
	.then(res => res.json())
    .then(data => data);

  return user;
}

export async function sendFriendRequestOtherUser(currentUser: User, otherUser: User)
{
	fetch('/api/auth/sendFriendRequest', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser, otherUser: otherUser }),
		credentials: 'include'
	})
}

type FriendRequest = {
	from_user_id: number;
	to_user_id: number;
};

export async function alreadyFriends(currentUser: User, otherUser: User): Promise<Boolean> 
{
	const friends = await fetch('/api/auth/friends', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser, otherUser: otherUser }),
		credentials: 'include'
	})
	.then(async res => {
		const text = await res.text();
		if (!text) return null;
		return JSON.parse(text);
	})
	.then(data => { return data })
	if (friends)
		return true;
	return false;
}

export async function getRandomEligibleOtherUser(): Promise<User | null>
{
	const eligibleUser = await fetch('/api/auth/randomEligibleOtherUser', {
		method: 'GET',
		// headers: { 'Content-Type': 'application/json' },
		// body: JSON.stringify({ currentUser: currentUser }),
		credentials: 'include'
	})
	.then(res => {
		if (res.status === 204)
			return null;
		return res.json();
	})
	.then(data => { return data })
	if (eligibleUser)
		return eligibleUser;
	return null;
}

export async function friendInvitationReceived(currentUser: User, otherUser: User): Promise<Boolean> 
{
	const invitationReceived = await fetch('/api/auth/invitationReceived', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser, otherUser: otherUser }),
		credentials: 'include'
	})
	.then(async res => {
		const text = await res.text();
		if (!text) return null;
		return JSON.parse(text);
	})
	.then(data => { return data })
	if (invitationReceived)
		return true;
	return false;
}

export async function howManyFriendsRequests(): Promise<number>
{
	const nbFriendsRequests = await fetch('/api/auth/requestFriendExists', { credentials: 'include' })
	.then(res => res.json())
	.then(async (data: FriendRequest[]) => {
		//const currentUser: User = await getCurrentUser();
		//return data.filter(item => item.to_user_id === currentUser.id).length;
		return data.length;
	});
	return nbFriendsRequests;
}

export async function friendsRequest(i :number): Promise<User | null>
{
	const allFriendsRequest: FriendRequest[] = await fetch('/api/auth/requestFriendExists', { credentials: 'include' })
	.then(res => res.json())
	.then(async (data: FriendRequest[]) => {
		// const currentUser: User = await getCurrentUser();
		// return data.filter(item => item.to_user_id === currentUser.id);
		return data;
	});
	return await getUserById(allFriendsRequest[i].from_user_id);
}

//check if 2 users are friends
export async function updateFriendshipStatus(currentUser: User, otherUser: User , status: Boolean)
{
	fetch('/api/auth/updateFriendshipStatus', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser, otherUser: otherUser, status: status }),
		credentials: 'include'
	})
}

type FriendsConnexion = {
	user_a_id: number;
	user_b_id: number;
};

export async function howManyFriends(): Promise<number>
{
	const friendConnections: FriendsConnexion[] = await fetch('/api/auth/getFriends', {
		method: 'GET',
		credentials: 'include'
	}).then(res => res.json());

	return friendConnections.length;
}

// getFriends fetch returns:  [ { user_a_id: 2, user_b_id: 3 } ]
export async function displayFriend(i: number): Promise<User>
{
	const currentUser: User = await getCurrentUser();
	const allFriends: FriendsConnexion[] = await fetch('/api/auth/getFriends', {
		method: 'GET',
		credentials: 'include'
	})
	.then(res => res.json());

	if (!allFriends || i < 0 || i >= allFriends.length)
		throw new Error("Invalid index || no friends found");
	const friendId = allFriends[i].user_a_id === currentUser.id ? allFriends[i].user_b_id : allFriends[i].user_a_id;
	// checkFriendIsConnected(friendId);
	return await getUserById(friendId);
}

export async function checkFriendIsConnected(userId: number)
{
	const res = await fetch(`/api/auth/friends/${userId}/online`, {
      method: 'GET',
      credentials: 'include'
    });
	const bool = await res.json();
	// console.log(`bool = ${bool.success}`);
	return bool.success;
}

export async function reloadFriendshipsStatus(/*currentUser: User*/)
{
	// reload all Friend_requests
	const nbFriendsRequests = await howManyFriendsRequests();
	let i: number = 0;
	while (i < nbFriendsRequests)
	{
		const userToFriend: User | null = await friendsRequest(i);
		await addFriendRequestCard(userToFriend);
		i++;
	}

	// reload all friends
	const nbFriends = await howManyFriends();
	let j: number = 0;
	while (j < nbFriends)
	{
		displayAllFriends(j);
		j++;
	}
}

// export async function reloadOtherUsersCard()
// {
// 	const reloadothersUsersCard = document.getElementById('othersUsersCard');
// 	if (reloadothersUsersCard)
// 		reloadothersUsersCard.innerHTML = '';
// 	let i: number = 0;
// 	let j: number = 0;
// 	let k: number = 0;
// 	const othersUsersDiv = document.getElementById("othersUsersDiv");
// 		othersUsersDiv?.classList.remove("hidden");
// 		const totalUsers = await getTotalUser();
// 		const currentUser: User = await getCurrentUser();
	
// 		if (totalUsers > 1)
// 		{
// 			let max: number = totalUsers - 1 > 2 ? 2 : totalUsers - 1;
			// if (totalUsers == 2)
				// max = 1;
// 			let randomUser: User | null;
// 			let listOthersFriends: User[] = [];
// 			let noOtherFriend = 0;
// 			while (i < max)
// 			{
// 				randomUser = await getRandomEligibleOtherUser(currentUser);
// 				if (randomUser) listOthersFriends.push(randomUser);
// 				if (i > 0)
// 				{
// 					while (randomUser && listOthersFriends[0].id === listOthersFriends[1].id)
// 					{
// 						listOthersFriends.pop();
// 						randomUser = await getRandomEligibleOtherUser(currentUser);
// 						if (randomUser) listOthersFriends.push(randomUser);
// 						if (j >= totalUsers)
// 							randomUser = null;
// 						j++;
	
// 					}
// 				}
// 				const container = document.getElementById("othersUsersCard");
// 				const othersUsersP = document.getElementById("othersUsersP");
// 				if (randomUser && container)
// 				{
// 					let name: string = `othersUsers_${randomUser.id}_card`;
// 					let userId: string = randomUser.id.toString();
// 					container.insertAdjacentHTML("beforeend", othersUsersCard.render(name, userId));
// 					othersUsersCard.init(randomUser, k);
// 					othersUsersP!.textContent = "Others Users";
// 					noOtherFriend++;
// 				}
// 				else
// 				{
// 					if (noOtherFriend == 0)
// 					{// change the msg bc it is a bit ugly but the logic is there
// 						othersUsersP!.textContent = "No others users to connect with";
// 					}
// 				}
// 				i++;
// 			}
// 		}
// 		else
// 		{
// 			const othersUsersP = document.getElementById("othersUsersP");
// 			othersUsersP!.textContent = "You are the only player registered in the database. You can't connect with no one.";
// 		}
// }