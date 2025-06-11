let tournament = false;
let players: string[] = [];
const playersListElem = document.getElementById("playersList")!;

export function showPopup(message: string): void
{
	const popup = document.getElementById('popup');
	if (popup)
	{
		popup.textContent = message;
		popup.style.opacity = '1'; // Show popup
		setTimeout(() => {
			popup.style.opacity = '0'; // Hide popup after 2 seconds
		}, 2000);
	}
}

export function setupTournamentUI()
{
	document.getElementById("create_tournament")!.addEventListener('click', () =>
		{
			document.getElementById("set_tournament")!.style.display = 'block';
		});
	
	document.getElementById("addPlayerBtn")!.addEventListener("click", () => {
		const input = document.getElementById("playerNameInput") as HTMLInputElement;
		const name = input.value.trim();
		if (name.length > 0 && players.indexOf(name) === -1)//check if user not exists yet
		{
			players.push(name);
			input.value = "";
		}
		else if (name.length === 0)
			showPopup("Player's name can't be empty.");
		else
			showPopup("the player's name has already been added.");
		console.log("players: ", players);
		playersListElem.innerHTML = players.map(p => `<div>${p}</div>`).join('');
		if (players.length > 0)
			document.getElementById("playersList")!.style.display = 'block';
		if (players.length >= 1)
			document.getElementById("start_tournament")!.style.display = 'block';

	});

	document.getElementById("start_tournament")?.addEventListener("click", () => {
		if (players.length < 4)
			showPopup("Add at least 4 players.");
		else if (players.length % 2 !== 0)
			showPopup("Number of players has to be even.");
	});

}