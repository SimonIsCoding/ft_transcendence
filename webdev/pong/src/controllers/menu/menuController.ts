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
		const fullCanva = document.getElementById('fullCanva');
		if (fullCanva)
		{
			fullCanva.innerHTML = infoView.render();
			//add DOM
		}
	});
//here to add the button to redirect to the dashboard
}

export const menuController = {
  init(): void
  {
	// const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement | null;
	// if (loginBtn)
		// loginBtnClicked(loginBtn);
	// 
	// const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement | null;
	// if (registerBtn)
		// registerBtnClicked(registerBtn);
	
	const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
	if (playBtn)
		playBtnClicked(playBtn);
	
	// const loggedIconAnchor = document.getElementById('loggedIcon') as HTMLAnchorElement | null;
	// if (loggedIconAnchor)
		// loggedIconAnchorClicked(loggedIconAnchor);
  }
};
