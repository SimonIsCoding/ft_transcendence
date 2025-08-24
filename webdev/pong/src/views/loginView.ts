import { handleSuccessfulLogin, initLogin } from '../services/loginService';
import { setupPasswordToggle, showErrorPopup/*, showSuccessPopup*/ } from '../utils/utils';
import { Router } from '../router.ts';
import { handleSidebar } from './sidebar/sidebarBehavior.ts';

declare const google: any;

export const loginView = {
  render: (): string => `
  	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">
	
	<div id="popup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50"></div>
	
		<div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-[64px]">
		</div>
		
			<main id="gameArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">

			<div id="loginCredentials" class="flex flex-col justify-center items-center w-full space-y-10">
				<input id="login" type="text" placeholder="Login" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75" />
				<div class="relative">
					<input id="password" type="password" placeholder="Password" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75" />
					<button id="togglePasswordLogin" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
					<svg id="eyeIconClosedLogin" fill="#fbd11b" viewBox="0 0 16 16" width="21" height="21" aria-hidden="true"><path fill="#fbd11b" d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path></svg>
					<svg id="eyeIconOpenedLogin" xmlns="http://www.w3.org/2000/svg" fill="#fbd11b" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" class="hidden">
					<path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
					</button>
				</div>
				<button id="connectionBtn" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75">Log in</button>
				<button id="backToRegister" class="text-white px-2 text-xl underline">Click here to create an account</button>
				<button id="googleConnectionBtn"></button>
			</div>
			<div id="twofa-container" class="hidden flex-col justify-center items-center w-full space-y-10"><!-- Will be populated by TwoFAController --></div>
		</main>
    </div>
  `,
  async init(): Promise<void>
  {
	await handleSidebar();

	setupPasswordToggle("password", "togglePasswordLogin", "eyeIconClosedLogin", "eyeIconOpenedLogin");
	initLogin();
	initGoogleSignIn();

	const backToRegister = document.getElementById('backToRegister') as HTMLButtonElement | null;
	backToRegister!.addEventListener('click', () => Router.navigate('register'));
  }
};


function initGoogleSignIn()
{
	google.accounts.id.initialize({
		client_id: "11816073281-ka847kttjiaqlci012l9p7kpip87kocr.apps.googleusercontent.com",
		callback: handleCredentialResponse
	});

	google.accounts.id.renderButton(
		document.getElementById("googleConnectionBtn"),
		{
			theme: "outline",
			size: "large",
			text: "signin_with",
			shape: "rectangular", // or pill
			width: 315
		}
	);
}

async function handleCredentialResponse(response: any)
{
	console.log("ID Google Token:", response.credential);
	const res = await fetch("/api/auth/google", {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id_token: response.credential })
	});
	const data = await res.json();
	console.log("Internal JWT:", data.success);
	console.log(`Gprovider = ${data.provider}`);
	if (!data.success)
		showErrorPopup("Google SignIn failed", "popup");
	getGoogleProfile();
}

async function getGoogleProfile()
{
	const res = await fetch("/api/auth/googleSession", {
		method: "POST",
		credentials: "include"
	});

	if (res.status === 401)
	{
		console.log("Not authenticated");
		return;
	}

	const data = await res.json();
	console.log(`data = ${data}`);
	console.log(`data.provider = ${data.provider}`);
	if (res.status === 201)
	{
		// console.log("in res.status === 201, data.provider =", data.provider );
		console.log(`data.name = ${data.login}, data.userId = ${data.userId}`);

		handleSuccessfulLogin(data.login, data.userId);
	}
	console.log("Protected data:", data);
}
