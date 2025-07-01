import { AuthView } from './authView';
import { GameView } from './game';
import { SettingsView } from './settings';
import { authService } from '../services/authService';
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
      <div class="flex flex-col h-screen md:flex-row md:min-w-[1000px]">
        <!-- Left Sidebar -->
        <aside class="w-full md:w-64 bg-gray-100 p-4 border-r border-gray-200" id="auth-container">
          ${this.renderAuth()}
        </aside>
        
        <!-- Game Area -->
        <main class="flex-1 min-w-[800px] bg-black p-4 overflow-auto">
          ${GameView.renderGameCanvas()}
        </main>
        
        <!-- Settings Panel -->
        <div class="w-full md:w-72 bg-gray-50 p-4 border-l border-gray-200">
          ${SettingsView.renderGameSettings()}
        </div>
        
        <!-- Message Bar -->
        <div class="w-full bg-gray-800 text-white p-2" id="system-messages"></div>
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
    
    authController.init();

    // Add this if you need to re-render when auth state changes
    authService.onAuthStateChanged(() => {
      this.currentUser = authService.getCurrentUser();
      document.getElementById('auth-container')!.innerHTML = this.renderAuth();
    });
  }
};