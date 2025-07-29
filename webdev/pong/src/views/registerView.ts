import { Router } from '../router';
import { setupPasswordToggle } from '../utils/utils';
import { initRegistration } from '../services/registrationService';

export const registerView = {
  render: (): string => `
	<div id="registerForm" class="flex flex-col justify-center items-center w-full space-y-10">
		<div class="relative">
			<input id="newUsername" placeholder="Username" class="text-white px-4 py-2 text-xl border border-white rounded w-80"/><br/>
		</div>
		<input id="newMail" placeholder="Mail" type="email" class="text-white px-4 py-2 text-xl border border-white rounded w-80"/>
		<div class="relative">
			<input id="newPassword" placeholder="Password" type="password" class="text-white px-4 py-2 text-xl border border-white rounded w-80"/>
			<button id="togglePassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
			<svg id="eyeIconClosed" fill="white" viewBox="0 0 16 16" width="21" height="21" aria-hidden="true"><path fill="white" d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path></svg>
			<svg id="eyeIconOpened" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" class="hidden">
			<path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
			</button>
			<br/>
		</div>
		<div class="relative">
			<input id="confirmPassword" placeholder="Confirm Password" type="password" class="text-white px-4 py-2 text-xl border border-white rounded w-80"/>
			<button id="toggleConfirmPassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
			<svg id="confirmEyeIconClosed" fill="white" viewBox="0 0 16 16" width="21" height="21" aria-hidden="true"><path fill="white" d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path></svg>
			<svg id="confirmEyeIconOpened" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" class="hidden">
			<path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
			</button>
			<br/>
		</div>
		<!-- <input id="newAlias" placeholder="Alias" class="text-white px-4 py-2 text-xl border border-white rounded w-80"/><br/> -->
		<button id="createAccountBtn" class="text-white px-2 py-1 text-xl border border-white rounded w-80">Create Account</button>
		<button id="backToLogin" class="text-white px-2 py-1 text-xl underline">Click here to be back to log in</button>
	</div>
  `,

  init(): void 
  {
	const gameArea = document.getElementById('gameArea');
	gameArea!.innerHTML = registerView.render();
	setupPasswordToggle("newPassword", "togglePassword", "eyeIconClosed", "eyeIconOpened");
	setupPasswordToggle("confirmPassword", "toggleConfirmPassword", "confirmEyeIconClosed", "confirmEyeIconOpened");
	initRegistration();

	const backToLogin = document.getElementById('backToLogin') as HTMLButtonElement | null;
	backToLogin!.addEventListener('click', () => { Router.navigate('login'); })
  }
};
