import { initLogin, initRegistration } from '../services/loginAndRegistration';

export class LoginView {
  public static render(): string {
    return `
	<div id="connexionBlock" class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<h1 id="title" class="text-3xl font-bold mb-6 text-blue-600">Hi</h1>
		<input id="login" type="text" placeholder="Login" class="mb-2 px-4 py-2 border rounded w-64" />
		<input id="password" type="password" placeholder="Password" class="mb-4 px-4 py-2 border rounded w-64"/>
		<div class="mb-4 px-4 py-2 rounded w-64 flex justify-between">
			<button id="login-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Log in</button>
			<button id="registerBtn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Register</button>
		</div>
		<p id="welcome-div" style="display: none;"></p>
	</div>`;
  }

public static init(): void {
//   console.log("in webdev/pong/src/views/login.ts: Login page initialized");
  initLogin();
  initRegistration();
}
}
