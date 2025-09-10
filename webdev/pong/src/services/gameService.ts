import { Router } from "../router";
import { showErrorPopup } from "../utils/utils";
import { renderGameHistoryCard } from "../views/sidebar/profileBtn/gameHistorySubmenuRender";

export type Player = {
  alias: string;
  score?: number;
};

export type Match = {
  player1: Player;
  player2: Player;
  winner: Player | null;
};

export async function sendGameService(gameType: string, match: Match)
{
	if (gameType == 'p-vs-ai')
	{
		if (match.player1.alias == '')
		{
			match.player1.alias = match.player2.alias;
			match.player2.alias = 'AI';
		}
	}
	try
	{
		fetch('/api/game/matches', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				player1: match.player1.alias,
				player2: match.player2.alias,
				scorePlayer1: match.player1.score ?? 0,
				scorePlayer2: match.player2.score ?? 0,
				winner: match.winner?.alias,
				gameMode: gameType,
			})
		});
		
		// if (!gameReponse.ok)
        	// return showErrorPopup(gameReponse.error, "popup");
	}
	catch (error)
	{
		console.error('Game Fetch error:', error);
		showErrorPopup("Error with storing the game in historial.", "popup");
		Router.navigate('home');
	}
}

export type matchid = {
	matchid: number;
	player1: string;
	player2: string;
	scorePlayer1: number;
	scorePlayer2: number;
	gameMode: string;
	finished_at: string;
};

export async function gameCurrentUserHasPlayedService()
{
	try
	{
		const games: matchid[] = await fetch('/api/game/matches', {
			credentials: 'include',
		}).then(res => res.json());

		const result = {
			count: games.length,
			data: games,
		};

		return result;
	}
	catch (error)
	{
		console.error('gameCurrentUserHasPlayedService error:', error);
		showErrorPopup("Error with getting historic games", "popup");
		Router.navigate('home');
	}
}

export const manageGameHistorial = (() => {
  let games: matchid[] = [];

  async function main()
  {
    const gamesResult = await gameCurrentUserHasPlayedService();
    games = gamesResult?.data ?? [];

    const container = document.getElementById("gameHistoryContainer");
    if (!container)
		return;

    container.innerHTML = games.map(match => renderGameHistoryCard(match)).join("");
  }

  function reset()
  {
		const container = document.getElementById("gameHistoryContainer");
		if (container) container.innerHTML = "";
		games = [];
  }

  return { main, reset };
})();
