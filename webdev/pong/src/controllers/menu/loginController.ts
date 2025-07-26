import { Router } from '../../router';
import { loginView } from '../../views/loginView';
import { initLogin } from '../../services/loginService';
import { setupPasswordToggle } from '../../utils/utils';
import { registerBtnClicked } from './registrationController';

export function loginDomLoaded(): void
{
	Router.navigate('login');
	const gameArea = document.getElementById('gameArea');
	if (gameArea)
	{
		gameArea.innerHTML = loginView.render();
		initLogin();
		setupPasswordToggle("password", "togglePasswordLogin", "eyeIconClosedLogin", "eyeIconOpenedLogin");
	}
	const backToRegister = document.getElementById('backToRegister') as HTMLButtonElement | null;
	if (backToRegister)
		registerBtnClicked(backToRegister);
}

export function loginBtnClicked(loginBtn: HTMLButtonElement): void 
{
	loginBtn.addEventListener('click', () => {
		loginDomLoaded();
	});
}
