interface User {
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