import { getCurrentUser } from "../../utils/utils";

interface User {
  id: number;
  login: string;
//   password: string;
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
	console.log("in sendFriendRequestOtherUser, Printing currentUser = ", currentUser);
	console.log("in sendFriendRequestOtherUser, Printing otherUser = ", otherUser);
	fetch('/api/auth/sendFriendRequest', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ currentUser: currentUser, otherUser: otherUser }),
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => 
	{
		console.log("/api/auth/sendFriendRequest data received = ", data);
	})
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
	console.log("currentUser = ", currentUser);
	console.log("otherUser = ", otherUser);
	console.log("in alreadyFriends frontend and friends = ", friends);
	console.log("next");
	if (friends)
		return true;
	return false;
}

export async function friendInvitationSent(currentUser: User, otherUser: User): Promise<Boolean> 
{
	const invitationSent = await fetch('/api/auth/invitationSent', {
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
	console.log("in invitationSent frontend and invitationSent = ", invitationSent);
	if (invitationSent)
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
	.then(res => res.json())
	.then(data => 
	{
		console.log("/api/auth/updateFriendshipStatus data received = ", data);
	})
}