// import { registerView } from '../../views/registerView';
// import { initRegistration } from '../../services/registrationService';
// import { Router } from '../../router';
// import { setupPasswordToggle } from '../../utils/utils';
// import { loginBtnClicked } from './loginController';

// export function registerDomLoaded(): void
// {
// 	Router.navigate('register');
// 	const gameArea = document.getElementById('gameArea');
// 	if (gameArea)
// 	{
// 		gameArea.innerHTML = registerView.render();
// 		setupPasswordToggle("newPassword", "togglePassword", "eyeIconClosed", "eyeIconOpened");
// 		setupPasswordToggle("confirmPassword", "toggleConfirmPassword", "confirmEyeIconClosed", "confirmEyeIconOpened");
// 		initRegistration();
// 	}

// 	const backToLogin = document.getElementById('backToLogin') as HTMLButtonElement | null;
// 	if (backToLogin)
// 		loginBtnClicked(backToLogin);
// }

// export function registerBtnClicked(registerBtn: HTMLButtonElement): void 
// {
// 	registerBtn.addEventListener('click', () => {
// 		registerDomLoaded();
// 	});
// }