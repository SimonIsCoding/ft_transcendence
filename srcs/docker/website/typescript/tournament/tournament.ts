let tournament = false;
let players: string[] = [];

export function setupTournamentUI()
{
	document.getElementById("addPlayerBtn")!.addEventListener("click", () => {
		const input = document.getElementById("playerNameInput") as HTMLInputElement;
		const name = input.value.trim();
		if (name)
		{
			players.push(name);
			input.value = "";
		}
		console.log("players: ", players);
		if (players.length >= 1)
		{
			document.getElementById("start_tournament")!.style.display = 'block';
		}

	});

	document.getElementById("start_tournament")?.addEventListener("click", () => {
		if (players.length % 2 !== 0)
			alert("Number of players has to be even.");
	});

	document.getElementById("tournament")!.addEventListener('click', () =>
		{
			document.getElementById("playerForm")!.style.display = 'block';
			document.getElementById("formPopup")!.style.display = 'block';
		});
}