import { modifyInfo } from '../services/loginAndRegistration';

export class infoView {
  public static render(): string {
	return `
	<div>
		<p>Bienvenue sur la page d'information !</p>
		<button id="btn">This is a button</button>
	</div>`;
  }

public static init(): void {
	modifyInfo();
}
}
