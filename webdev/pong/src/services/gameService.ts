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
	console.log(`
				player1: ${match.player1.alias},
				player2: ${match.player2.alias},
				scorePlayer1: ${match.player1.score},
				scorePlayer2: ${match.player2.score},
				winner: ${match.winner?.alias},
				gameMode: ${gameType},
			`)
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
		console.log(`
				player1: ${match.player1.alias},
				player2: ${match.player2.alias},
				scorePlayer1: ${match.player1.score},
				scorePlayer2: ${match.player2.score},
				winner: ${match.winner?.alias},
				gameMode: ${gameType},
			`)
		fetch('/api/auth/games/matches', {
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
	try {
		const games: matchid[] = await fetch('/api/auth/games/nbMatchesPlayed', {
			credentials: 'include',
		}).then(res => res.json());

		const result = {
			count: games.length,
			data: games,
		};

		console.log(result);
		return result;
	}
	catch (error)
	{
		console.error('gameCurrentUserHasPlayedService error:', error);
		showErrorPopup("Error with storing the game in historial.", "popup");
		Router.navigate('home');
	}
}

export const manageGameHistorial = (() => {
  let i = 0;
  let games: matchid[] = [];

  async function main() {
    console.log("entered in manageGameHistorial");

    const gamesResult = await gameCurrentUserHasPlayedService();
    games = gamesResult?.data ?? [];

    const container = document.getElementById("gameHistorySubmenu");
    if (!container) return;

    while (i < games.length)
	{
		const match = games[i];
		container.innerHTML += renderGameHistoryCard(match);
		i++;
    }
  }

  function reset() {
    i = 0;
    games = [];
  }

  return { main, reset };
})();
