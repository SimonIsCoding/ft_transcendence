export const loginView = {
  render: (): string => `
	<div id="loginCredentials" class="flex flex-col justify-center items-center w-full space-y-10">
	<div id="successPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">Your account has been created
	</div>
		<input id="login" type="text" placeholder="Login" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded w-120" />
		<input id="password" type="password" placeholder="Password" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded w-120" />
		<button id="connectionBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded w-120">Log in</button>
	</div>
  `
};

export const registerView = {
  render: (): string => `
	<div id="registerForm" class="flex flex-col justify-center items-center w-full space-y-10">
		<div class="relative">
			<input id="newUsername" placeholder="Username" class="font-seven text-white px-3 px-1.5 text-3xl border border-white rounded w-120"/><br/>
		</div>
		<div class="relative">
			<input id="newPassword" placeholder="Password" type="password" class="font-seven text-white px-3 px-1.5 text-3xl border border-white rounded w-120"/>
			<button id="togglePassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
			<svg id="eyeIconClosed" fill="white" viewBox="0 0 16 16" width="21" height="21" aria-hidden="true"><path fill="white" d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path></svg>
			<svg id="eyeIconOpened" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" class="hidden">
			<path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
			</button>
			<br/>
		</div>
		<div class="relative">
			<input id="confirmPassword" placeholder="Confirm Password" type="password" class="font-seven text-white px-3 px-1.5 text-3xl border border-white rounded w-120"/>
			<button id="toggleConfirmPassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
			<svg id="confirmEyeIconClosed" fill="white" viewBox="0 0 16 16" width="21" height="21" aria-hidden="true"><path fill="white" d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path></svg>
			<svg id="confirmEyeIconOpened" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" class="hidden">
			<path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
			</button>
			<br/>
		</div>
		<!-- <input id="newAlias" placeholder="Alias" class="font-seven text-white px-3 px-1.5 text-3xl border border-white rounded w-120"/><br/> -->
		<input id="newMail" placeholder="mail" type="email" class="font-seven text-white px-3 px-1.5 text-3xl border border-white rounded w-120"/>
		<br/>
		<button id="createAccountBtn" class="font-seven text-white px-2 py-1 text-3xl border border-white rounded w-120">Create Account</button>
		<button id="backToLogin" class="font-seven text-white px-2 py-1 text-2xl underline">Click here to be back to log in</button>
	</div>
  `
};

//to choose between 1vs1 mode or tournament mode
export const chooseTypeOfGameView = {
  render: (): string => `
	<div class="absolute left-1/2 top-0 h-full border-l-4 border-white opacity-50 	border-dashed -translate-x-1/2">
	</div>
	<div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-black">
		<button id="OneVsOneBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded">1 VS 1</button>
	</div>
	<div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
		<button id="tournamentBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded">TOURNAMENT</button>
	</div>
  `
};

export const infoView = {
  render: (): string => `
	<div class="absolute left-1/2 top-0 h-full border-l-4 border-white opacity-50 	border-dashed -translate-x-1/2">
	</div>
	<div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-black">
		<button id="profileSettingsBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded">Profile Settings</button>
		<button id="logoutBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded">LOG OUT</button>
	</div>
	<div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
		<button id="DashboardBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded">DASHBOARD</button>
	</div>
  `
};