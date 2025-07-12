import { modifyInfo } from '../services/loginAndRegistration';

export class infoView {
  public static render(): string {
	return `
	<div class="justify-content: center;">
		<p class="justify-content: center;">Welcome to your info page!</br>You can see your details about your login and alias</p>
		<div id="info-credentials">

		</div>		
	</div>`;
  }

public static init(): void {
	modifyInfo();
}
}

		// <p>login: ${login}</p>
		// <p>alias: ${alias}</p>