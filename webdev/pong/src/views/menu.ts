export const loginView = {
  render: (): string => `
	<div id="loginCredentials" class="flex flex-col justify-center items-center w-full space-y-10">
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
			<button type="button" id="togglePassword" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-500">Show</button>
			<br/>
		</div>
		<div class="relative">
			<input id="confirmPassword" placeholder="Confirm Password" type="password" class="font-seven text-white px-3 px-1.5 text-3xl border border-white rounded w-120"/>
			<button id="toggleConfirmPassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-500">
			<svg id="eyeIconConfirm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
			</svg>
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