import { loginView, registerView, chooseTypeOfGameView } from '../views/menu';
import { GameView } from '../views/game';
import { gameController } from './gameController';
import { SettingsView } from '../views/settings';

export const menuController = {
  init(): void {
    const playBtn = document.getElementById('playBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
	if (playBtn)
		{
			playBtn.addEventListener('click', () => {
				const fullCanva = document.getElementById('fullCanva');
				if (fullCanva) {
					fullCanva.innerHTML = chooseTypeOfGameView.render();
				}

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
	
	if (loginBtn)
	{
      loginBtn.addEventListener('click', () => {
        const fullCanva = document.getElementById('fullCanva');
        if (fullCanva) {
          fullCanva.innerHTML = loginView.render();
        }
      });
	}
	
	if (registerBtn)
	{
      registerBtn.addEventListener('click', () => {
        const fullCanva = document.getElementById('fullCanva');
        if (fullCanva) {
          fullCanva.innerHTML = registerView.render();
        }
	    
		const backToLogin = document.getElementById('backToLogin');
		if (backToLogin)
		{
    	  backToLogin.addEventListener('click', () => {
    	    const fullCanva = document.getElementById('fullCanva');
    	    if (fullCanva) {
    	      fullCanva.innerHTML = loginView.render();
    	    }
    	  });
		}
      });
	}
}
};
