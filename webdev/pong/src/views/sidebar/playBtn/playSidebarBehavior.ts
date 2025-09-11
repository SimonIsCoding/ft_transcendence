import{ closeAllMenus, getCurrentUser, toggleMenuVisibility } from '../sidebarUtils'
import { showErrorPopup } from '../../../utils/utils';
import { TournamentArea } from '../../TournamentArea';
import { ShowGame } from '../../../pongGame/ShowGame';
import { gameSettings } from '../../../controllers/gameSettingsControllers';

export async function oneVsOneAreaInit()
{
	const player1Field = document.getElementById("player1") as HTMLInputElement;
	const status = await fetch('/api/auth/me/status', { credentials: 'include' })
    .then(res => res.json());
	if (status.authenticated)
	{
		const user = getCurrentUser();
		if (user)
			player1Field.value = user.login;
	}
	else
	{
		player1Field.removeAttribute("readonly");
		player1Field.setAttribute("placeholder", "Player 1");
	}

	const playBtn = document.getElementById('playOneVsOneBtn') as HTMLButtonElement | null;
	playBtn!.addEventListener('click', () => { 
		const player1 = document.getElementById("player1") as HTMLInputElement;
		const player2 = document.getElementById("player2") as HTMLInputElement;

		if (player1.value.trim().length > 40 || player2.value.trim().length > 40)
			return showErrorPopup("Inputs should contain no more than 40 caracters", "popup");
		if (!player1.value.trim() || !player2.value.trim())
			return showErrorPopup("You need 2 players to play.", "popup");

		new ShowGame().initGame({
	  		player1: { alias: player1.value },
			player2: { alias: player2.value },
			winner: null,
			type: '1vs1'
		});
		const submenus = document.querySelectorAll<HTMLElement>('.submenu');
		closeAllMenus(submenus);
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
	const player1VSAIField = document.getElementById("player1VSAI") as HTMLInputElement;
	const user = getCurrentUser();
	if (user)
		player1VSAIField.value = user.login;
	
	const playBtn = document.getElementById('playOneVsAIBtn') as HTMLButtonElement | null;
	playBtn!.addEventListener('click', () => {
		console.log(`maxScore: gameSettings.scoreLimit = ${gameSettings.scoreLimit}`)
		console.log(`aiDifficulty: gameSettings.iaDifficulty = ${gameSettings.iaDifficulty}`)

		const player1 = document.getElementById("player1") as HTMLInputElement;
		const player1VSAI = document.getElementById("player1VSAI") as HTMLInputElement;
		new ShowGame().initGame({
	  		player1: { alias: player1.value },
			player2: { alias: player1VSAI.value },
			winner: null,
			type: ''
		});
		const submenus = document.querySelectorAll<HTMLElement>('.submenu');
		closeAllMenus(submenus);
	});
}

export function playSidebarBehavior()
{
	const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	const playSidebarBtn = document.getElementById('playSidebarBtn');
	playSidebarBtn?.addEventListener('click', () => {
		toggleMenuVisibility('playSubmenu', submenus);
	});
}
