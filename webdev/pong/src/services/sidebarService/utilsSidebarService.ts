export async function isConnected(): Promise<boolean>
{
	const res = await fetch('/api/auth/status', {
			method: 'GET',
  			credentials: 'include' 
	})

	const data = await res.json();
	console.log("data.authenticated = ", data.authenticated);
	if (data.authenticated === true)
		return true;
	return false;
}

export async function getUserInfo()
{
	const res = await fetch("/api/auth/info", {
		method: 'GET',
		credentials: 'include'
	})
	const data = await res.json()

	const profileName = document.getElementById("profileName");
	if (profileName && data.user.login)
		profileName.textContent = data.user.login;
	else
		profileName!.textContent = `Profile Name`;

	const mail = document.getElementById("mailInProfileSubmenu");
	if (mail && data.user.mail)
		mail.textContent = data.user.mail;
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
	if (playerNameDashboard && data.user.login)
		playerNameDashboard.textContent = data.user.login;
	else
		playerNameDashboard!.textContent = "Username";
}