import { loginView } from '../../views/menu';
import { initLogin } from '../../services/loginService';
import { Router } from '../../router';
import { setupPasswordToggle } from '../../utils/utils';
import { registerBtnClicked } from './registrationController';

export function loginDomLoaded(): void
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

export function loginBtnClicked(loginBtn: HTMLButtonElement): void 
{
	loginBtn.addEventListener('click', () => {
		loginDomLoaded();
	});
}
