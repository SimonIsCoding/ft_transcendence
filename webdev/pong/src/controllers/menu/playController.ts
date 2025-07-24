import { Router } from '../../router';
import { chooseTypeOfGameView } from '../../views/chooseTypeOfGameView'

//might change the name of the page bc play can refer to the fact of playing
export function playDomLoaded(): void
{
	Router.navigate('play');
	const fullCanva = document.getElementById('fullCanva');
	if (fullCanva)
	{
		fullCanva.innerHTML = chooseTypeOfGameView.render();
		chooseTypeOfGameView.init();
	}
}

export function playBtnClicked(playBtn: HTMLButtonElement): void
{
	playBtn.addEventListener('click', () => {
		playDomLoaded();
	});
}