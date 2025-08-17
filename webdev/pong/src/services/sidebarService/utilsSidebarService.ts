// export async function isConnected(): Promise<boolean>
// {
// 	const res = await fetch('/api/auth/status', {
// 			method: 'GET',
//   			credentials: 'include' 
// 	})

import { getCurrentUser } from "../../utils/utils";

// 	const data = await res.json();
// 	if (data.authenticated === true)
// 		return true;
// 	return false;
// }

// websocket.ts
// export function connectWebSocket(): Promise<WebSocket>
// {
// 	return new Promise((resolve, reject) => {
// 		const socket = new WebSocket(`wss://localhost:4443/api/auth/ws`);

// 		socket.onopen = () => {
// 			console.log("✅ WebSocket opened");
// 			resolve(socket);
// 		};

// 		socket.onerror = err => {
// 			console.error("❌ WebSocket error", err);
// 			reject(err);
// 		};
// 	});
// }

export async function isConnected(): Promise<boolean>
{
	const currentUser = await getCurrentUser();
	const userId = currentUser.id;
	if (userId === undefined)
	{
		console.log("entered in false for isConnected() => not doing fetch");
		return false;
	}
	console.log(`in isConnected, currentUser.id = ${currentUser.id}`);
	const res = await fetch(`/api/auth/status/${userId}`, {
		method: 'GET',
		credentials: 'include'
	});
	const data = await res.json();
	console.log(`in https://${location.host}/api/auth/status/${userId}, and data.authenticated = ${data.authenticated}`);
	return data.authenticated;
}

export async function getUserInfo()
{
	fetch("/api/auth/info")
	.then(res => res.json())
	.then(data => {
		const profileName = document.getElementById("profileName");
		if (profileName && data.login)
			profileName.textContent = data.login;
		else
			profileName!.textContent = `Profile Name`;

		const mail = document.getElementById("mailInProfileSubmenu");
		if (mail && data.mail)
			mail.textContent = data.mail;
		else
			mail!.textContent = `contact@mail.com`;

		//here we should add the stats of the matchs won
		// but we have to fecth another db which is the stats one
		// const stats = document.getElementById("statsInProfileSubmenu");
		// if (stats && )
		// 	stats.textContent = ;
		// else
		// 	stats!.textContent = `12/15 matchs won`;

		const playerNameDashboard = document.getElementById("playerNameDashboard");
		if (playerNameDashboard && data.login)
			playerNameDashboard.textContent = data.login;
		else
			playerNameDashboard!.textContent = "Username";
	});
}