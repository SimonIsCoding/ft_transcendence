import { setCurrentUser } from "../../views/sidebar/sidebarUtils";
import { gameCurrentUserHasPlayedService } from "../gameService";

export async function isConnected(): Promise<boolean>
{
	const res = await fetch('/api/auth/me/status', {
			method: 'GET',
  			credentials: 'include' 
	})

	const data = await res.json();
	if (data.authenticated === true)
		return true;
	return false;
}

export async function getUserInfo()
{
	const res = await fetch("/api/auth/me", {
		method: 'GET',
		credentials: 'include'
	})
	const data = await res.json()
	setCurrentUser(data.user);

	const profileName = document.getElementById("profileName");
	if (profileName)
		profileName.textContent = data.user.login || "Profile Name";

	const mail = document.getElementById("mailInProfileSubmenu");
	if (mail)
		mail.textContent = data.user.mail  || "contact@mail.com";

	//here we should add the stats of the matchs won
	// but we have to fecth another db which is the stats one
	const stats = document.getElementById("statsInProfileSubmenu");
	const nbGames = await gameCurrentUserHasPlayedService();
	if (stats)
		stats.textContent = `${nbGames!.count} games played`;

	const playerNameDashboard = document.getElementById("playerNameDashboard");
	if (playerNameDashboard)
		playerNameDashboard.textContent = data.user.login ||  "Username";
}