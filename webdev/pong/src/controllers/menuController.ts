import { loginView, registerView, chooseTypeOfGameView } from '../views/menu';
import { GameView } from '../views/game';
import { gameController } from './gameController';
import { SettingsView } from '../views/settings';
import { initLogin, initRegistration } from '../services/loginAndRegistration';

//playBtnClicked || bindPlayButton
export function playBtnClicked(playBtn: HTMLButtonElement): void 
{
	playBtn.addEventListener('click', () => {
	const fullCanva = document.getElementById('fullCanva');
	if (fullCanva)
		fullCanva.innerHTML = chooseTypeOfGameView.render();

	const OneVsOneBtn = document.getElementById('OneVsOneBtn');
	if (OneVsOneBtn)
	{
		OneVsOneBtn.addEventListener('click', () => {
		const fullCanva = document.getElementById('fullCanva');
		if (fullCanva)
		{
			fullCanva.innerHTML = GameView.renderGameCanvas();
			GameView.initGameCanvas();
			gameController.init();
		}
		const footer = document.getElementById('footerSettings');
		if (footer)
		{
			footer.innerHTML = SettingsView.renderGameSettings();
			SettingsView.initSettings();
		}
		});
	}
	//here to add the button to redirect to the tournament
	});
}

export function loginBtnClicked(loginBtn: HTMLButtonElement): void 
{
	loginBtn.addEventListener('click', () => {
	const fullCanva = document.getElementById('fullCanva');
	if (fullCanva) {
		fullCanva.innerHTML = loginView.render();
		initLogin();
	}
	});
}

export function registerBtnClicked(registerBtn: HTMLButtonElement): void 
{
	registerBtn.addEventListener('click', () => {
	const fullCanva = document.getElementById('fullCanva');
	if (fullCanva)
	{
		fullCanva.innerHTML = registerView.render();
		initRegistration();
	}
	
	const backToLogin = document.getElementById('backToLogin') as HTMLButtonElement | null;
	if (backToLogin)
		loginBtnClicked(backToLogin);
	});
}

export const menuController = {
  init(): void
  {
	const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement | null;
	const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement | null;
	const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
		
	if (loginBtn)
		loginBtnClicked(loginBtn);
	if (registerBtn)
		registerBtnClicked(registerBtn);
	if (playBtn)
		playBtnClicked(playBtn);
  }
};
