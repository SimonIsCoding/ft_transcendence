import { GameView } from '../views/game';
import { gameController } from '../controllers/gameController';
import { Router } from '../router';

//to choose between 1vs1 mode or tournament mode
export const chooseTypeOfGameView = {
  render: (): string => `
	<div class="absolute left-1/2 top-0 h-full border-l-4 border-white opacity-50 	border-dashed -translate-x-1/2">
	</div>
	<div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-black">
		<button id="OneVsOneBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded">1 VS 1</button>
	</div>
	<div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
		<button id="tournamentBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded">TOURNAMENT</button>
	</div>
  `,

  init(): void
  {
	const OneVsOneBtn = document.getElementById('OneVsOneBtn') as HTMLButtonElement | null;
	if (OneVsOneBtn)
	{
		OneVsOneBtn.addEventListener('click', () => {
			Router.navigate('game');
			const fullCanva = document.getElementById('fullCanva') as HTMLDivElement | null;
			if (fullCanva) {
				fullCanva.innerHTML = GameView.renderGameCanvas();
				GameView.initGameCanvas();
				gameController.init();
				fullCanva.classList.remove("border-4");
				fullCanva.classList.remove("border-white");
			}
		});
	}
	// TODO : add other buttons like tournamentBtn 
	}
};