import { AuthView } from './authView';
import { GameView } from './game';
import { SettingsView } from './settings';
import { authService } from '../services/authService';
import { gameController } from '../controllers/gameController';
import { authController } from '../controllers/authController';
import { isConnected, initRegistration } from '../services/loginAndRegistration';
import { LoginView } from './login';
//where the code start on the main page

// interface User {
//   email: string;
//   token: string;
// }

interface User {
  login: string;
  password: string;
  alias: string;
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
		<a href="/login" id="login-icon" class="hidden absolute right-6 top-6">
  			<img src="/login-icon.png" alt="Login" class="h-8 w-8" />
		</a>
		<a href="/logged" id="logged-icon" class="hidden absolute right-6 top-6">
  			<img src="/logged-icon.png" alt="Logged" class="h-8 w-8" />
		</a>
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
    // this.currentUser = authService.getCurrentUser();
    GameView.initGameCanvas();
    gameController.init();

    authController.init();

	SettingsView.initSettings();

    // Add this if you need to re-render when auth state changes
    authService.onAuthStateChanged(() => {
    //   this.currentUser = authService.getCurrentUser();
      document.getElementById('auth-container')!.innerHTML = this.renderAuth();
    });

	console.log("HOLAAAA");
	LoginView.init();
	initRegistration((user) => {
	  isConnected(user);
	});

  }
};