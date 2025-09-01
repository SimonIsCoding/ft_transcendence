import { GameView } from '../views/game';

export const gameController = {
  init(): void {
    window.addEventListener('keydown', (e) => {
      if (this.shouldHandle(e)) {
        e.preventDefault();
        GameView.handleKeyDown(e.key);
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.shouldHandle(e)) {
        e.preventDefault();
        GameView.handleKeyUp(e.key);
      }
    });
  },

  shouldHandle(e: KeyboardEvent): boolean {
    const active = document.activeElement as HTMLElement | null;

    // If typing in a form, let the browser handle it
    if (
      active &&
      (active.tagName === "INPUT" ||
       active.tagName === "TEXTAREA" ||
       active.isContentEditable)
    ) {
      return false;
    }

    return ['ArrowUp', 'ArrowDown', 'w', 's'].includes(e.key);
  }
};
