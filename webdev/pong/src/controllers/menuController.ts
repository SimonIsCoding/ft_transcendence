import { chooseTypeOfGameView } from '../views/chooseTypeOfGameView';

export const menuController = {
  init(): void {
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const fullCanva = document.getElementById('fullCanva');
        if (fullCanva) {
          fullCanva.innerHTML = chooseTypeOfGameView.render();
        }
      });
    }
  }
};
