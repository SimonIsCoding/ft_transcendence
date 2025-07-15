// In your game state management file (e.g., GameState.ts)
export type GamePhase = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';


export class GameState {
  private static currentPhase: GamePhase = 'MENU';
  private static settingsLocked = false;

  static getCurrentPhase(): GamePhase {
    return this.currentPhase; // Now TypeScript sees it's being read
  }
  
  static setPhase(phase: GamePhase) {
    this.currentPhase = phase;
    this.settingsLocked = phase !== 'MENU';
    this.updateSettingsUI();
  }

  static isSettingsEditable(): boolean {
    return !this.settingsLocked;
  }

  static updateSettingsUI() {
    const inputs = document.querySelectorAll('#game-settings input, #game-settings select');
    inputs.forEach(input => {
      if (this.settingsLocked) {
        input.setAttribute('disabled', 'true');
        input.parentElement?.classList.add('opacity-50');
      } else {
        input.removeAttribute('disabled');
        input.parentElement?.classList.remove('opacity-50');
      }
    });
  }
}