import { AuthView } from './authView';
import { GameView } from './game';
import { SettingsView } from './settings';
import { authService } from '../services/authService';
import { gameController } from '../controllers/gameController';
import { authController } from '../controllers/authController';

interface User {
  email: string;
  token: string;
}

export const HomeView = {
  currentUser: null as User | null,
  isLogin: true,

 render(): string {
  return `
    <div class="flex flex-col min-h-screen bg-[#fbd11b] text-black">

      <!-- Header with Pong Logo -->
      <header class="flex justify-center items-center h-24 bg-[#fbd11b]">
        <img src="/pong-logo.png" alt="PONG Logo" class="h-16">
      </header>

      <!-- Game Canvas Area -->
	<main class="flex-1 flex items-center justify-center bg-[#fbd11b] overflow-y-auto min-h-[450px]">
        ${GameView.renderGameCanvas()}
      </main>

      <!-- Control Panel -->
      <footer class="bg-[#fbd11b] p-4">
        ${SettingsView.renderGameSettings()}
      </footer>

    </div>
    `;
  },


  renderAuth(): string {
    const user = authService.getCurrentUser(); // Use service instead of direct localStorage
    return user 
      ? AuthView.renderProfile(user.email)
      : AuthView.renderAuthForm(this.isLogin);
  },

  init(): void {
    this.currentUser = authService.getCurrentUser();
    GameView.initGameCanvas();
    gameController.init();

    authController.init();

	SettingsView.initSettings();

    // Add this if you need to re-render when auth state changes
    authService.onAuthStateChanged(() => {
      this.currentUser = authService.getCurrentUser();
      document.getElementById('auth-container')!.innerHTML = this.renderAuth();
    });
  }
};
