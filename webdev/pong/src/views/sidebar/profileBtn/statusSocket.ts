// let socket: WebSocket;

// interface User {
//   id: number;
//   login: string;
//   mail: string;
//   profile_picture: string,
//   token: string;
// }
export function onLoginSuccess()
{
	const ws = new WebSocket(`wss://${location.host}/ws`);
	ws.onopen = () => ws.send('ping');
	ws.onmessage = (e) => console.log('Réponse:', e.data);
}

// export async function initStatusSocket(currentUser: User)
// {
// 	socket = new WebSocket(`wss://localhost:4443/api/auth/statusWS`);
// 	console.log("entered in initStatusSocket.ts and socket = ", socket);

// 	socket.addEventListener("open", () => {
// 		console.log("✅ WebSocket connected");

// 		socket.send(JSON.stringify({
// 			type: "identify",
// 			user: currentUser
// 		}));
// 	});

// 	socket.onmessage = (event) =>
// 	{
// 			const data = JSON.parse(event.data);
// 			if (data.type === 'status')
// 			{
// 				// Mettre à jour le UI : data.userId, data.isOnline
// 				// Ici tu pourrais mettre à jour ton DOM ou ton store
// 				// friendsStatus_${currentUser.login}
// 				// const friendsStatus = document.getElementById(`friendsStatus_${currentUser.login}`)
// 				// friendsStatus?.classList.remove()
// 			}
// 		}

// 	socket.addEventListener("close", () => {
// 		console.log("⚠️ WebSocket closed");
// 	});

// 	socket.addEventListener("error", (err) => {
// 		console.error("❌ WebSocket error", err);
// 	});

// 	return socket;
// }

// export function closeSocket()
// {
// 	if (socket) 
// 		socket.close();
// }

