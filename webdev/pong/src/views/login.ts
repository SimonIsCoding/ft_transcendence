import { initSimonFeatures } from '../services/simonFeatures';

export class LoginView {
  public static render(): string {
    return `<div>
	<h1 id="title">Hi</h1>
	<input type="text" id="login" placeholder="Login">
	<input type="password" id="password" placeholder="Password">
	<button id="login-btn">Log in</button>
	<button id="registerBtn">Register</button>
	<div id="welcome-div" style="display: none;"></div>
	</div>`;
  }

public static init(): void {
  console.log("in webdev/pong/src/views/login.ts: Login page initialized");
  initSimonFeatures();
}
}
