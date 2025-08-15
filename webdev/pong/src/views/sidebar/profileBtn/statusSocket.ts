// filename: statusSocket.ts
let socket: WebSocket;

interface User {
	id: number;
	login: string;
	mail: string;
	profile_picture: string;
	token: string;
}

export function initStatusSocket(user: User)
{
	console.log("🟢 initStatusSocket called for user", user.login);

	socket = new WebSocket("wss://localhost:4443/api/auth/ws"); // assigner à la variable globale

	socket.onopen = () =>
	{
		console.log("✅ WebSocket connected");
		console.log("📝 Sending identify message with token/user info");
		socket.send(JSON.stringify({ type: 'identify', user }));
		console.log("📝 Identify message sent:", { id: user.id, login: user.login, mail: user.mail, profile_picture: user.profile_picture });
	};

	socket.onmessage = (event) =>
	{
		console.log("📩 Message received from server:", event.data);
		try
		{
			const data = JSON.parse(event.data);
			if (data.type === 'status')
				console.log(`🟢 User ${data.userId} is ${data.isOnline ? "online" : "offline"}`);
		}
		catch (err) { console.warn("❌ Failed to parse server message:", err); }
	};

	socket.onclose = (event) =>
	{
		console.warn(`⚠️ WebSocket closed code=${event.code} reason=${event.reason}`);
	};

	socket.onerror = (err) =>
	{
		console.error("❌ WebSocket error:", err);
	};
}

export function closeSocket()
{
	if (!socket)
	{
		console.log("🟡 No socket to close");
		return;
	}

	socket.close();
	console.log("🔴 Socket closed manually");
}
