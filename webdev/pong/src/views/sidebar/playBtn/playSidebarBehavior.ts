import{ toggleMenuVisibility } from '../sidebarUtils'
import { Router } from '../../../router';
import { showErrorPopup } from '../../../utils/utils';
import { TournamentArea } from '../../TournamentArea';
import { ShowGame } from '../../../pong-erik/ShowGame';
// import { Game } from '../../../pong-erik/Game';

function swapPlayer(id1: string, id2: string): void
{
	const input1 = document.getElementById(id1) as HTMLInputElement | null;
	const input2 = document.getElementById(id2) as HTMLInputElement | null;

	if (input1 && input2)
	{
		const tmp = input1.value;
		input1.value = input2.value;
		input2.value = tmp;
	}
}

function swapElements(id1: string, id2: string)
{
	const el1 = document.getElementById(id1);
	const el2 = document.getElementById(id2);

	if (!el1 || !el2)
		return;

	const parent = el1.parentNode;
	const next1 = el1.nextSibling;
	const next2 = el2.nextSibling;

	if (next1 === el2)
		parent!.insertBefore(el2, el1);
	else if (next2 === el1)
		parent!.insertBefore(el1, el2);
	else
	{
		parent!.insertBefore(el1, next2);
		parent!.insertBefore(el2, next1);
	}
}

export function oneVsOneAreaInit()
{
	const oneVsOneBtn = document.getElementById("oneVsOneBtn");
	const gameArea = document.getElementById("gameArea");
	const oneVsOneArea = document.getElementById("oneVsOneArea");
	const oneVsAIArea = document.getElementById("oneVsAIArea");
	const tournamentArea = document.getElementById("tournamentArea");

	oneVsOneBtn?.addEventListener('click', () => {
		gameArea?.classList.add('hidden');
		oneVsOneArea?.classList.remove('hidden');
		oneVsAIArea?.classList.add('hidden');
		tournamentArea?.classList.add('hidden');
	});
	document.getElementById("swapBtn")?.addEventListener("click", () => {
		swapPlayer("player1", "player2");
	});

	const playBtn = document.getElementById('playOneVsOneBtn') as HTMLButtonElement | null;
	playBtn!.addEventListener('click', () => { 
		const player1 = document.getElementById("player1") as HTMLInputElement;
		const player2 = document.getElementById("player2") as HTMLInputElement;
		if (!player1.value.trim() || !player2.value.trim())
		{
			showErrorPopup("You need 2 players to play.", "oneVsOneAreaPopup");
			return ;
		}
		ShowGame.gameType = 'p-vs-p';
		ShowGame.inGame = true;
		Router.navigate('game'); 
	});
}

export function tournamentAreaInit()
{
	
	const tournamentBtn = document.getElementById("tournamentBtn");
	const gameArea = document.getElementById("gameArea");
	const tournamentArea = document.getElementById("tournamentArea");
	const oneVsOneArea = document.getElementById("oneVsOneArea");
	const oneVsAIArea = document.getElementById("oneVsAIArea");
	const esquemaTorneo = document.getElementById("esquemaTorneo");
	tournamentBtn?.addEventListener('click', () => {
		gameArea?.classList.add('hidden');
		oneVsOneArea?.classList.add('hidden');
		oneVsAIArea?.classList.add('hidden');
		tournamentArea?.classList.remove('hidden');
		esquemaTorneo?.classList.remove('hidden');
		TournamentArea.init();
	});
}

export function oneVsAIAreaInit()
{
	const oneVsAIBtn = document.getElementById("oneVsAIBtn");
	const gameArea = document.getElementById("gameArea");
	const oneVsAIArea = document.getElementById("oneVsAIArea");
	const oneVsOneArea = document.getElementById("oneVsOneArea");
	const tournamentArea = document.getElementById("tournamentArea");
	const esquemaTorneo = document.getElementById("esquemaTorneo");
	oneVsAIBtn?.addEventListener('click', () => {
		gameArea?.classList.add('hidden');
		oneVsOneArea?.classList.add('hidden');
		oneVsAIArea?.classList.remove('hidden');
		tournamentArea?.classList.add('hidden');
		esquemaTorneo?.classList.add('hidden');
	});
	document.getElementById("swapAIBtn")?.addEventListener("click", () => {
		swapElements("player1VSAI", "AIPlayer");
	});

	const playBtn = document.getElementById('playOneVsAIBtn') as HTMLButtonElement | null;
	playBtn!.addEventListener('click', () => {
		const player1VSAI = document.getElementById("player1VSAI") as HTMLInputElement;
		if (!player1VSAI.value.trim())
		{
			showErrorPopup("You need 1 player to play.", "oneVsAIAreaPopup");
			return ;
		}
		ShowGame.gameType = 'p-vs-ai';
		ShowGame.inGame = true;
		Router.navigate('game');
	});
}

export function playSidebarBehavior()
{
	const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	const playSidebarBtn = document.getElementById('playSidebarBtn');
	playSidebarBtn?.addEventListener('click', () => {
		const location = window.location.pathname;
		if (location === '/game') {
			const gameArea = document.getElementById('gamesArea');
			gameArea?.classList.add('hidden');
			ShowGame.noWinner = false;
			Router.navigate("home");
		} else {
			toggleMenuVisibility('playSubmenu', submenus);
			oneVsOneAreaInit();
			oneVsAIAreaInit();
			tournamentAreaInit();
			// TournamentArea.init();
	});
}