import { Router } from '../router';
import { setupPasswordToggle } from '../utils/utils';
import { initRegistration } from '../services/registrationService';
import { handleSidebar } from './sidebarBehavior.ts';

export const registerView = {
  render: (): string => `
    <div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">

      <div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-1/24"></div>
  
      <main id="gameArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full">

        <div id="registerForm" class="flex flex-col justify-center items-center w-full space-y-10">
          <div id="successPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50"></div>

          <div class="relative">
            <input id="newUsername" placeholder="Username" class="text-white px-4 py-2 text-xl border border-white rounded w-80"/>
          </div>

          <input id="newMail" placeholder="Mail" type="email" class="text-white px-4 py-2 text-xl border border-white rounded w-80"/>

          <div class="relative">
            <input id="newPassword" placeholder="Password" type="password" class="text-white px-4 py-2 text-xl border border-white rounded w-80"/>
            <button id="togglePassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg id="eyeIconClosed" fill="white" viewBox="0 0 16 16" width="21" height="21"></svg>
              <svg id="eyeIconOpened" class="hidden" fill="white" viewBox="0 0 24 24" width="24" height="24"></svg>
            </button>
          </div>

          <div class="relative">
            <input id="confirmPassword" placeholder="Confirm Password" type="password" class="text-white px-4 py-2 text-xl border border-white rounded w-80"/>
            <button id="toggleConfirmPassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg id="confirmEyeIconClosed" fill="white" viewBox="0 0 16 16" width="21" height="21"></svg>
              <svg id="confirmEyeIconOpened" class="hidden" fill="white" viewBox="0 0 24 24" width="24" height="24"></svg>
            </button>
          </div>

          <button id="createAccountBtn" class="text-white px-2 py-1 text-xl border border-white rounded w-80">Create Account</button>
          <button id="backToLogin" class="text-white px-2 py-1 text-xl underline">Click here to go back to log in</button>

          <!-- Hidden 2FA container -->
     	  <div id="twofa-container" class="hidden flex-col justify-center items-center w-full space-y-10"><!-- Will be populated by TwoFAController --></div>

        </div>

      </main>
    </div>
  `,

  async init(): Promise<void> {
    await handleSidebar();

    setupPasswordToggle("newPassword", "togglePassword", "eyeIconClosed", "eyeIconOpened");
    setupPasswordToggle("confirmPassword", "toggleConfirmPassword", "confirmEyeIconClosed", "confirmEyeIconOpened");

    initRegistration();

    const backToLogin = document.getElementById('backToLogin') as HTMLButtonElement | null;
    backToLogin!.addEventListener('click', () => { Router.navigate('login'); });
  }
};
