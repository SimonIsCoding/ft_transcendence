import { GameView } from './game';
import { GameState } from '../models/GamePhase';
import { GAME_CONFIG } from '../config';
// import { GameSounds } from '../models/GameSounds';


export const SettingsView = {
  renderGameSettings(): string {
    const isEditable = GameState.isSettingsEditable();
    
    return `
      <div class="flex flex-col md:flex-row justify-between gap-4 p-4">
        <!-- Player 1 Settings -->
        <div class="flex-1 bg-yellow-100 p-4 rounded-lg border-2 border-black shadow-md">
          <h3 class="text-lg font-bold mb-3 text-center">Player 1</h3>
          ${this.renderPlayerControls('p1', isEditable)}
        </div>

        <!-- Game Settings -->
        <div class="flex-1 bg-yellow-100 p-4 rounded-lg border-2 border-black shadow-md mx-0 md:mx-4">
          <h3 class="text-lg font-bold mb-3 text-center">Game Settings</h3>
          
          <!-- Level DIP Switch -->
          <div class="mb-6">
            <p class="text-sm font-medium mb-2 text-center">Game Level</p>
            <div class="flex justify-center gap-6">
              ${this.renderDipSwitch('level', 'normal', 'Normal', true, isEditable)}
              ${this.renderDipSwitch('level', 'high', 'High', false, isEditable)}
            </div>
          </div>
          
          <!-- Points DIP Switch -->
          <div class="mb-6">
            <p class="text-sm font-medium mb-2 text-center">Points to Win</p>
            <div class="flex justify-center gap-6">
              ${this.renderDipSwitch('points', '11', '11', true, isEditable)}
              ${this.renderDipSwitch('points', '15', '15', false, isEditable)}
            </div>
          </div>
          
          <!-- Sound Toggle (always editable) -->
          <!--
		  <div>
            <p class="text-sm font-medium mb-2 text-center">Sound</p>
            ${this.renderSoundToggle()}
          </div>
		  -->
        </div>

        <!-- Player 2 Settings -->
        <div class="flex-1 bg-yellow-100 p-4 rounded-lg border-2 border-black shadow-md">
          <h3 class="text-lg font-bold mb-3 text-center">Player 2</h3>
          ${this.renderPlayerControls('p2', isEditable)}
        </div>
      </div>
    `;
  },

  renderPlayerControls(playerId: string, isEditable: boolean): string {
    return `
      <div class="space-y-4">
        <!-- Player Type Selector -->
        <div>
          <select 
            id="${playerId}-type" 
            class="w-full p-2 rounded-md border-2 border-black bg-yellow-50 shadow-inner focus:ring-2 focus:ring-black focus:outline-none ${
              !isEditable ? 'opacity-50 cursor-not-allowed' : ''
            }"
            ${!isEditable ? 'disabled' : ''}
          >
            <option value="me">Me</option>
            <option value="alias">Alias</option>
            <option value="remote">Remote Player</option>
            <option value="ia" selected>AI</option>
          </select>
        </div>
        
        <!-- Alias Input (hidden by default) -->
        <div id="${playerId}-alias-container" class="hidden">
          <input 
            type="text" 
            id="${playerId}-alias" 
            placeholder="Enter alias" 
            class="w-full p-2 rounded-md border-2 border-black bg-yellow-50 shadow-inner focus:ring-2 focus:ring-black focus:outline-none ${
              !isEditable ? 'opacity-50 cursor-not-allowed' : ''
            }"
            ${!isEditable ? 'disabled' : ''}
          >
        </div>
        
        <!-- Remote Player Selector (hidden by default) -->
        <div id="${playerId}-remote-container" class="hidden">
          <select 
            id="${playerId}-remote" 
            class="w-full p-2 rounded-md border-2 border-black bg-yellow-50 shadow-inner focus:ring-2 focus:ring-black focus:outline-none ${
              !isEditable ? 'opacity-50 cursor-not-allowed' : ''
            }"
            ${!isEditable ? 'disabled' : ''}
          >
            <option value="">Select player</option>
            <!-- Remote players populated dynamically -->
          </select>
        </div>
      </div>
    `;
  },

  renderDipSwitch(name: string, value: string, label: string, isChecked: boolean, isEditable: boolean): string {
    return `
      <label class="relative inline-flex items-center mb-5 cursor-pointer ${
        !isEditable ? 'opacity-50' : ''
      }">
        <input 
          type="radio" 
          name="${name}" 
          value="${value}" 
          class="sr-only peer" 
          ${isChecked ? 'checked' : ''}
          ${!isEditable ? 'disabled' : ''}
        >
        <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black ${
          !isEditable ? 'cursor-not-allowed' : ''
        }"></div>
        <span class="ml-2 text-sm font-medium">${label}</span>
      </label>
    `;
  },

  renderSoundToggle(): string {
    return `
      <div class="flex justify-center">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id="sound-toggle" class="sr-only peer" checked>
          <div class="w-20 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black">
            <span class="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-black peer-checked:text-white transition-all">
              OFF
            </span>
            <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white peer-checked:text-black transition-all">
              ON
            </span>
          </div>
        </label>
      </div>
    `;
  },

  initSettings(): void {
    // Initialize DIP switches
    document.querySelectorAll('input[name="level"]').forEach(input => {
      input.addEventListener('change', (e) => {
        if (!GameState.isSettingsEditable()) return;
        const level = (e.target as HTMLInputElement).value;
        GameView.setBallSpeedMultiplier(level === 'high' ? 1.2 : 1);
        GameView.setPaddleSize(level === 'high' ? GAME_CONFIG.PADDLE_HEIGHT * 0.75: GAME_CONFIG.PADDLE_HEIGHT);
      });
	
    })
	/*
	const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('change', async (e) => {
        const isChecked = (e.target as HTMLInputElement).checked;
        GameSounds.setEnabled(isChecked);
        
        // Play test sound when enabling
        if (isChecked) {
          await GameSounds.play('paddle'); // Test with paddle sound
        }
      });

      // Initialize toggle state
      (soundToggle as HTMLInputElement).checked = true;
    };
*/
    document.querySelectorAll('input[name="points"]').forEach(input => {
      input.addEventListener('change', (e) => {
        if (!GameState.isSettingsEditable()) return;
        GameView.setMaxPoints(parseInt((e.target as HTMLInputElement).value));
      });
    });
/*
    // Sound toggle (always works)
    document.getElementById('sound-toggle')?.addEventListener('change', (e) => {
      const isChecked = (e.target as HTMLInputElement).checked;
      // Assuming you have an AudioManager or similar
      GameSounds.setEnabled(isChecked);
	  if (isChecked) {
	    GameSounds.play('paddle'); // Optional: play test sound
	  }
    });
*/
	    // Player type handlers
	['p1', 'p2'].forEach(playerId => {
	  const typeSelect = document.getElementById(`${playerId}-type`);
	  const aliasContainer = document.getElementById(`${playerId}-alias-container`);
	  const remoteContainer = document.getElementById(`${playerId}-remote-container`);

	  typeSelect?.addEventListener('change', (e) => {
	    if (!GameState.isSettingsEditable()) return;
	
	    const target = e.target as HTMLSelectElement;
	    const type = target.value;
	
	    // Type guard to ensure valid player type
	    if (type === 'me' || type === 'alias' || type === 'remote' || type === 'ia') {
	      GameView.setPlayerType(playerId, type);

	      // Show/hide additional fields
	      if (aliasContainer && remoteContainer) {
	        aliasContainer.classList.toggle('hidden', type !== 'alias');
	        remoteContainer.classList.toggle('hidden', type !== 'remote');
	      }
	    } else {
	      console.error('Invalid player type selected:', type);
	    }
	  });

	  // Initialize player type UI
	  if (typeSelect && aliasContainer && remoteContainer) {
	    const currentType = (typeSelect as HTMLSelectElement).value;
	    if (currentType === 'me' || currentType === 'alias' || currentType === 'remote' || currentType === 'ia') {
	      aliasContainer.classList.toggle('hidden', currentType !== 'alias');
	      remoteContainer.classList.toggle('hidden', currentType !== 'remote');
	    }
	  }
	});

  },

  updateSettingsForGamePhase(): void {
    const isEditable = GameState.isSettingsEditable();
    const allSettings = document.querySelectorAll(
      '#p1-type, #p1-alias, #p1-remote, ' +
      '#p2-type, #p2-alias, #p2-remote, ' +
      'input[name="level"], input[name="points"]'
    );

    allSettings.forEach(setting => {
      if (isEditable) {
        setting.removeAttribute('disabled');
        setting.classList.remove('opacity-50', 'cursor-not-allowed');
      } else {
        setting.setAttribute('disabled', 'true');
        setting.classList.add('opacity-50', 'cursor-not-allowed');
      }
    });

    // Update parent labels for visual consistency
    document.querySelectorAll('label').forEach(label => {
      if (label.querySelector('input[name="level"], input[name="points"]')) {
        label.classList.toggle('opacity-50', !isEditable);
      }
    });
  }
};