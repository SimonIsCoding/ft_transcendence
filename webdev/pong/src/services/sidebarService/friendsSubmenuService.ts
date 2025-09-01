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
	const res = await fetch('/api/auth/users/count', {
		method: 'GET',
		credentials: 'include'
	})
	const { total } = await res.json();
	return total;
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

export async function sendFriendRequestOtherUser(otherUser: User)
{
  fetch('/api/auth/friends', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ toUserId: otherUser.id }),
    credentials: 'include'
  });
}

type FriendRequest = {
	from_user_id: number;
	to_user_id: number;
};

export async function getRandomEligibleOtherUser(): Promise<User | null>
{
	const eligibleUser = await fetch('/api/auth/randomEligibleOtherUser', {
		method: 'GET',
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

export async function howManyFriendsRequests(): Promise<number>
{
	const nbFriendsRequests = await fetch('/api/auth/requestFriendExists', { credentials: 'include' })
	.then(res => res.json())
	.then(async (data: FriendRequest[]) => {
		return data.length;
	});
	return nbFriendsRequests;
}

export async function friendsRequest(i :number): Promise<User | null>
{
	const allFriendsRequest: FriendRequest[] = await fetch('/api/auth/requestFriendExists', { credentials: 'include' })
	.then(res => res.json())
	.then(async (data: FriendRequest[]) => {
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
	return await getUserById(friendId);
}

export async function checkFriendIsConnected(friendId: number)
{
	const res = await fetch(`/api/auth/friends/${friendId}/online`, {
      method: 'GET',
      credentials: 'include'
    });
	const bool = await res.json();
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