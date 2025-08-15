// import { getCurrentUser } from "../../utils/utils";
// import { initStatusSocket } from "../../views/sidebar/profileBtn/statusSocket";

export async function isConnected(): Promise<boolean>
{
	// const currentUser = await getCurrentUser();
	// initStatusSocket(currentUser);
	const res = await fetch('/api/auth/status', {
			method: 'GET',
  			credentials: 'include' 
	})

	const data = await res.json();
	if (data.authenticated === true)
	{
		console.log("data.authenticated = ", data.authenticated);
		return true;
	}
	console.log("data.authenticated = ", data.authenticated);
	return false;
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