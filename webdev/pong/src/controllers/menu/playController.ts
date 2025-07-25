import { Router } from '../../router';
import { chooseTypeOfGameView } from '../../views/chooseTypeOfGameView'
import { GameView } from '../../views/game';
import { gameController } from '../gameController';

//might change the name of the page bc play can refer to the fact of playing
export function playDomLoaded(): void
{
	Router.navigate('play');
	const gameArea = document.getElementById('gameArea');
	if (gameArea)
	{
		gameArea.innerHTML = chooseTypeOfGameView.render();
		chooseTypeOfGameView.init();
	}
}

export function playBtnClicked(playBtn: HTMLButtonElement): void
{
	playBtn.addEventListener('click', () => {
		Router.navigate('game');
		const gameArea = document.getElementById('gameArea') as HTMLDivElement | null;
		if (gameArea)
		{
			gameArea.innerHTML = GameView.renderGameCanvas();
			GameView.initGameCanvas();
			gameController.init();
		}
	});
}