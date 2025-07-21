export const loginView = {
  render: (): string => `
	<div id="loginCredentials" class="flex flex-col justify-center items-center w-full space-y-10">
		<input id="login" type="text" placeholder="Login" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120" />
		<input id="password" type="password" placeholder="Password" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120" />
		<button id="connectionBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120">Log in</button>
	</div>
  `
};

export const registerView = {
  render: (): string => `
	<div id="registerForm" class="flex flex-col justify-center items-center w-full space-y-10">
		<input id="newUsername" placeholder="Username" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120"/><br/>	
		<input id="newPassword" placeholder="Password" type="password" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120"/><br/>
		<input id="newAlias" placeholder="Alias" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120"/><br/>
		<button id="createAccountBtn" class="font-seven text-white uppercase px-3 py-1.5 text-5xl border border-white rounded w-120">Create Account</button>
		<button id="backToLogin" class="font-seven text-white uppercase px-1 py-1 text-2xl underline">Click here to be back to log in</button>
	</div>
  `
};

//to choose between 1vs1 mode or tournament mode
export const chooseTypeOfGameView = {
  render: (): string => `
	<div class="absolute left-1/2 top-0 h-full border-l-4 border-white opacity-50 	border-dashed -translate-x-1/2">
	</div>
	<div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-black">
		<button id="OneVsOneBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded">1 VS 1</button>
	</div>
	<div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
		<button id="tournamentBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded">TOURNAMENT</button>
	</div>
  `
};

export const infoView = {
  render: (): string => `
	<div class="absolute left-1/2 top-0 h-full border-l-4 border-white opacity-50 	border-dashed -translate-x-1/2">
	</div>
	<div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-black">
		<button id="profileSettingsBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded">Profile Settings</button>
		<button id="logoutBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded">LOG OUT</button>
	</div>
	<div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
		<button id="DashboardBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded">DASHBOARD</button>
	</div>
  `
};