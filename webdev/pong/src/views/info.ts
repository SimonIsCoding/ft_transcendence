//this file has to be
import { modifyInfo, initInfo} from '../services/loginAndRegistration';

export class infoView {
  public static render(): string {
	return `
	<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<h1 class="text-3xl font-bold mb-6 text-blue-600">Welcome to your info page!<h1>
		<p class="flex flex-col items-center justify-center">You can see your details about your login and alias</p>
		<div id="info-credentials" class="flex flex-col items-center justify-center">
			<label id="current-login" for="current-login">current login: - Change it to: </label>
  			<input type="text" id="new-login" name="new-login" class="mb-4 px-4 py-2 border rounded w-64"><br><br>
			<label id="current-alias" for="current-alias">current alias: - Change it to: </label>
  			<input type="text" id="new-alias" name="new-alias" class="mb-4 px-4 py-2 border rounded w-64"><br><br>
			<button id="modifyBtn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Modify</button>
		</div>
	</div>`;
  }

public static init(): void {
	initInfo();
			const login = localStorage.getItem("login") || "";
			const alias = localStorage.getItem("alias") || "";
			console.log("current login in localStorage:", login);
			console.log("current alias in localStorage:", alias);

			const loginLabel = document.getElementById("current-login");
			const aliasLabel = document.getElementById("current-alias");

			const loginInput = document.getElementById("new-login") as HTMLInputElement;
			const aliasInput = document.getElementById("new-alias") as HTMLInputElement;

			if (loginLabel)
				loginLabel.innerText = `Current login: ${login} - Change it to:`;
			if (aliasLabel)
				aliasLabel.innerText = `Current alias: ${alias} - Change it to:`;

			if (loginInput)
				loginInput.value = login;
			if (aliasInput)
				aliasInput.value = alias;
	modifyInfo();
}
}