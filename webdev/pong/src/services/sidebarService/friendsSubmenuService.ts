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

//you have to create an endpoint foruer_a sending Inveitation request to user_b
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

export async function isRequestFriendExists(): Promise<User | null>
{
	const friendRequest: FriendRequest | null = await fetch('/api/auth/requestFriendExists', { credentials: 'include' })
	.then(res => res.json())
	.then(async (data: FriendRequest[]) => {
		const currentUser: User = await getCurrentUser();
		return data.find(item => item.to_user_id === currentUser.id) || null;
	});

	if (friendRequest)
		return await getUserById(friendRequest.from_user_id);
	return null;
}
