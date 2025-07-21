import { GameView } from '../views/game';

 export const gameController = {
  init(): void {
    window.addEventListener('keydown', (e) => {
      // Prevent default for arrow keys
      if (['ArrowUp', 'ArrowDown', 'w', 's'].includes(e.key)) {
        e.preventDefault();
      }
      GameView.handleKeyDown(e.key);
    });

    window.addEventListener('keyup', (e) => {
      // Prevent default for arrow keys
      if (['ArrowUp', 'ArrowDown', 'w', 's'].includes(e.key)) {
        e.preventDefault();
      }
      GameView.handleKeyUp(e.key);
    });
  }
};
