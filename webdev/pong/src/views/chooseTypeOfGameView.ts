export const loginView = {
  render: (): string => `
	<div class="flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
		<div id="loginCredentials" class="flex flex-col justify-center items-center w-full space-y-10">
			<input id="login" type="text" placeholder="Login" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120" />
			<input id="password" type="password" placeholder="Password" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120" />
			
			<div class="flex justify-center">
			<button id="connectionBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120">Log in</button>
			</div>
		</div>
	</div>
  `
};

export const registerView = {
  render: (): string => `
	<div class="flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
		<div id="registerForm" class="flex flex-col justify-center items-center w-full space-y-10">
			<input id="newUsername" placeholder="Username" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120"/><br/>	
			<input id="newPassword" placeholder="Password" type="password" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120"/><br/>
			<input id="newAlias" placeholder="Alias" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120"/><br/>
			<button id="createAccount" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded w-120">Create Account</button>
			<button id="backToLogin" class="font-seven text-white uppercase px-1 py-1 text-2xl">Click here to be back to log in</button>
		</div>
	</div>
  `
};
			
export const chooseTypeOfGameView = {
  render: (): string => `
    <div class="flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
      <div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-gray-900">
        <button id="OneVsOneBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded">1 VS 1</button>
      </div>
      <div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
        <button id="tournamentBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded">TOURNAMENT</button>
      </div>
    </div>
  `
};

export const simonokok = {
  render: (): string => `
    <div class="flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
      <div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-gray-900">
        <button id="OneVsOneBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded">WELL DETECTED</button>
      </div>
      <div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
        <button id="tournamentBtn" class="font-seven text-white uppercase px-6 py-3 text-5xl border border-white rounded">HOLAAAAAAAAAAAA</button>
      </div>
    </div>
  `
};