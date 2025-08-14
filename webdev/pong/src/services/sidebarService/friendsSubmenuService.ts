import { getCurrentUser } from "../../utils/utils";

interface User {
  id: number;
  login: string;
  mail: string;
  profile_picture: string,
  token: string;
}

//first function to check which friends can we add
export async function getTotalUser()
{
	const res = await fetch('/api/auth/countTotalUsers', {
		method: 'GET',
		credentials: 'include'
	})
	const data = await res.json();
	return data;
}

export async function getUserById(userId: number)
{
	const user: User = await fetch('/api/auth/getUserById', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ userId: userId }),
	credentials: 'include'
	})
	.then(res => res.json())
	.then(data => { return data })
	return (user);
}

//you have to create an endpoint for user_a sending Invitation request to user_b
export async function sendFriendRequestOtherUser(currentUser: User, otherUser: User)
{
	fetch('/api/auth/sendFriendRequest', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser, otherUser: otherUser }),
		credentials: 'include'
	})
	// .then(res => res.json())
	// .then(data => { return data })
}

type FriendRequest = {
	from_user_id: number;
	to_user_id: number;
};

export async function alreadyFriends(currentUser: User, otherUser: User): Promise<Boolean> 
{
	const friends = await fetch('/api/auth/friends', {
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
	if (friends)
		return true;
	return false;
}

export async function getRandomEligibleOtherUser(currentUser: User): Promise<User | null>
{
	const eligibleUser = await fetch('/api/auth/randomEligibleOtherUser', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser }),
		credentials: 'include'
	})
	.then(res => res.json())
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
	console.log("in friendInvitationReceived, invitationReceived = ", invitationReceived);
	if (invitationReceived)
		return true;
	return false;
}

// export async function isRequestFriendExists(): Promise<User | null>
// {
// 	const friendRequest: FriendRequest | null = await fetch('/api/auth/requestFriendExists', { credentials: 'include' })
// 	.then(res => res.json())
// 	.then(async (data: FriendRequest[]) => {
// 		const currentUser: User = await getCurrentUser();
// 		return data.find(item => item.to_user_id === currentUser.id) || null;
// 	});

// 	if (friendRequest)
// 		return await getUserById(friendRequest.from_user_id);
// 	return null;
// }

export async function howManyFriendsRequests(): Promise<number>
{
	const nbFriendsRequests = await fetch('/api/auth/requestFriendExists', { credentials: 'include' })
	.then(res => res.json())
	.then(async (data: FriendRequest[]) => {
		const currentUser: User = await getCurrentUser();
		return data.filter(item => item.to_user_id === currentUser.id).length;
	});
	return nbFriendsRequests;
}

export async function friendsRequest(i :number): Promise<User | null>
{
	const allFriendsRequest: FriendRequest[] = await fetch('/api/auth/requestFriendExists', { credentials: 'include' })
	.then(res => res.json())
	.then(async (data: FriendRequest[]) => {
		const currentUser: User = await getCurrentUser();
		return data.filter(item => item.to_user_id === currentUser.id);
	});
	return await getUserById(allFriendsRequest[i].from_user_id);
}

export async function updateFriendshipStatus(currentUser: User, otherUser: User , status: Boolean)
{
	fetch('/api/auth/updateFriendshipStatus', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser, otherUser: otherUser, status: status }),
		credentials: 'include'
	})
	// .then(res => res.json())
	// .then(data => { return data })
}

type FriendsConnexion = {
	user_a_id: number;
	user_b_id: number;
};

export async function howManyFriends(): Promise<number>
{
	const currentUser = await getCurrentUser();
	const nbFriends = await fetch('/api/auth/getFriends', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId: currentUser.id }),
		credentials: 'include'
	})
	.then(res => res.json())
	.then(async (data: FriendsConnexion[]) => {
		const currentUser: User = await getCurrentUser();
		let nbFriends = data.filter(item => item.user_a_id === currentUser.id).length;
		console.log("in fetch for howManyFriends & nbFriends 1 = ", nbFriends);
		if (nbFriends == 0)
			nbFriends = data.filter(item => item.user_b_id === currentUser.id).length;
		console.log("in fetch for howManyFriends & nbFriends 2 = ", nbFriends);
		return nbFriends;
	});
	console.log("in frontend howManyFriends, nbFriends = ", nbFriends);
	return nbFriends;
}

// getFriends fetch returns:  [ { user_a_id: 2, user_b_id: 3 } ]
export async function displayFriend(i: number): Promise<User>
{
	console.log("entering in displyFriend function");
	const currentUser: User = await getCurrentUser();
	const allFriends: FriendsConnexion[] = await fetch('/api/auth/getFriends', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId: currentUser.id }),
		credentials: 'include'
	})
	.then(res => res.json())
	.then((data: FriendsConnexion[]) => {
		return data.filter(item =>
			item.user_a_id === currentUser.id || item.user_b_id === currentUser.id
		);
	});

	if (!allFriends || i < 0 || i >= allFriends.length)
	{
		console.log("entering in new Error condition");
		throw new Error("Invalid index || no friends found");
	}

	console.log("allFriends List = ", allFriends);
	const friendId = allFriends[i].user_a_id === currentUser.id ? allFriends[i].user_b_id : allFriends[i].user_a_id;
	console.log("in DisplayFriend, friendId = ", friendId);
	console.log("meaning it returns User = ", await getUserById(friendId));

	return await getUserById(friendId);
}
