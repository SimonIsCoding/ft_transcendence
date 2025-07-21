import { loginView, registerView, chooseTypeOfGameView, infoView } from '../views/menu';
import { GameView } from '../views/game';
import { gameController } from './gameController';
import { SettingsView } from '../views/settings';
import { initLogin, initRegistration } from '../services/loginAndRegistration';
import { Router } from '../router';

export function showGame(fullCanva: HTMLDivElement): void
{
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
}

//I had to cut this function in 2 with 'showGame' because I only need the 'showGame' piece of code in router. Otherwise the redirection for the game didn't work properly
export function displayGameOnClick(OneVsOneBtn: HTMLButtonElement): void
{
	OneVsOneBtn.addEventListener('click', () => {
	Router.navigate('game');
	const fullCanva = document.getElementById('fullCanva') as HTMLDivElement | null;
	if (fullCanva)
		showGame(fullCanva);
	});
}

export function playBtnClicked(playBtn: HTMLButtonElement): void
{
	playBtn.addEventListener('click', () => {
	Router.navigate('play');
	const fullCanva = document.getElementById('fullCanva');
	if (fullCanva)
		fullCanva.innerHTML = chooseTypeOfGameView.render();

	const OneVsOneBtn = document.getElementById('OneVsOneBtn') as HTMLButtonElement | null;
	if (OneVsOneBtn)
		displayGameOnClick(OneVsOneBtn);
	//here to add the condition for redirection to the tournament
	});
}

export function loginBtnClicked(loginBtn: HTMLButtonElement): void
{
	loginBtn.addEventListener('click', () => {
	Router.navigate('login');
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
	Router.navigate('register');
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

export function loggedIconAnchorClicked(loggedIconAnchor: HTMLAnchorElement): void
{
	loggedIconAnchor.addEventListener('click', (event) => {
		event!.preventDefault();
		Router.navigate('info');
	const fullCanva = document.getElementById('fullCanva');
	if (fullCanva)
	{
		fullCanva.innerHTML = infoView.render();
	}

	});
//here to add the button to redirect to the dashboard
}

export const menuController = {
  init(): void
  {
	const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement | null;
	const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement | null;
	const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
	const loggedIconAnchor = document.getElementById('loggedIcon') as HTMLAnchorElement | null;

	if (loginBtn)
		loginBtnClicked(loginBtn);
	if (registerBtn)
		registerBtnClicked(registerBtn);
	if (playBtn)
		playBtnClicked(playBtn);
	if (loggedIconAnchor)
		loggedIconAnchorClicked(loggedIconAnchor);
  }
};