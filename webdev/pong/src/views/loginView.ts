import { initLogin } from '../services/loginService';
import { Router } from '../router';
import { setupPasswordToggle } from '../utils/utils';
import { registerBtnClicked } from '../controllers/menu/registrationController.ts';

export const loginView = {
  render: (): string => `
	<div id="loginCredentials" class="flex flex-col justify-center items-center w-full space-y-10">
		<input id="login" type="text" placeholder="Login" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded w-120" />
		<div class="relative">
			<input id="password" type="password" placeholder="Password" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded w-120" />
			<button id="togglePasswordLogin" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
			<svg id="eyeIconClosedLogin" fill="white" viewBox="0 0 16 16" width="21" height="21" aria-hidden="true"><path fill="white" d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path></svg>
			<svg id="eyeIconOpenedLogin" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" class="hidden">
			<path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
			</button>
		</div>
		<button id="connectionBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded w-120">Log in</button>
		<button id="backToRegister" class="font-seven text-white px-2 py-1 text-2xl underline">Click here to create an account</button>
	</div>
  `,

  init(): void 
  {
	Router.navigate('login');
	const fullCanva = document.getElementById('fullCanva');
	if (fullCanva)
	{
		fullCanva.innerHTML = loginView.render();
		initLogin();
		setupPasswordToggle("password", "togglePasswordLogin", "eyeIconClosedLogin", "eyeIconOpenedLogin");
	}
	const backToRegister = document.getElementById('backToRegister') as HTMLButtonElement | null;
	if (backToRegister)
		registerBtnClicked(backToRegister);
  }
};
