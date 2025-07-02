import { GameView } from '../views/game';

export const gameController = {
  init(): void {
    window.addEventListener('keydown', (e) => {
      GameView.handleKeyDown(e.key);
    });

    window.addEventListener('keyup', (e) => {
      GameView.handleKeyUp(e.key);
    });
  }
};
