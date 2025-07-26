import { infoView } from '../../views/menu';
import { Router } from '../../router';
// import { loginBtnClicked } from './loginController';
// import { registerBtnClicked } from './registrationController';
import { playBtnClicked } from './playController';

export function loggedIconAnchorClicked(loggedIconAnchor: HTMLAnchorElement): void 
{
	loggedIconAnchor.addEventListener('click', (event) => {
		event!.preventDefault();
		Router.navigate('info');
		const gameArea = document.getElementById('gameArea');
		if (gameArea)
		{
			gameArea.innerHTML = infoView.render();
			//add DOM
		}
	});
//here to add the button to redirect to the dashboard
}

export const menuController = {
  init(): void
  {
	const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
	if (playBtn)
		playBtnClicked(playBtn);

	const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement | null;
	loginBtn?.addEventListener('click', () => { Router.navigate('login'); })
	
	const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement | null;
	registerBtn?.addEventListener('click', () => { Router.navigate('register'); })

	
	// const loggedIconAnchor = document.getElementById('loggedIcon') as HTMLAnchorElement | null;
	// if (loggedIconAnchor)
		// loggedIconAnchorClicked(loggedIconAnchor);
  }
};
