import{ toggleMenuVisibility } from './sidebarUtils'
import { Router } from '../../router';
import { showErrorPopup } from '../../utils/utils';

function swapPlayer()
{
	const input1 = document.getElementById("player1") as HTMLInputElement;
	const input2 = document.getElementById("player2") as HTMLInputElement;

	if (input1 && input2)
	{
		const tmp = input1.value;
		input1.value = input2.value;
		input2.value = tmp;
	}
}

export function oneVsOneAreaInit()
{
	const oneVsOneBtn = document.getElementById("oneVsOneBtn");
	const gameArea = document.getElementById("gameArea");
	const oneVsOneArea = document.getElementById("oneVsOneArea");
	oneVsOneBtn?.addEventListener('click', () => {
		gameArea?.classList.add('hidden');
		oneVsOneArea?.classList.remove('hidden');
		document.getElementById("swapBtn")?.addEventListener("click", () => {
			swapPlayer();
		});
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
		Router.navigate('game'); 
	});
}

export function playSidebarBehavior()
{
	const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	const playSidebarBtn = document.getElementById('playSidebarBtn');
	playSidebarBtn?.addEventListener('click', () => {
		toggleMenuVisibility('playSubmenu', submenus);
		oneVsOneAreaInit();
	});
}