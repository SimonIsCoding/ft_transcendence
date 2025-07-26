//I think you can erase it later
export const infoView = {
  render: (): string => `
	<div class="absolute left-1/2 top-0 h-full border-l-4 border-white opacity-50 	border-dashed -translate-x-1/2">
	</div>
	<div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-black">
		<button id="profileSettingsBtn" class="text-white px-4 py-2 text-xl border border-white rounded">Profile Settings</button>
		<button id="logoutBtn" class="text-white px-4 py-2 text-xl border border-white rounded">LOG OUT</button>
	</div>
	<div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
		<button id="DashboardBtn" class="text-white px-4 py-2 text-xl border border-white rounded">DASHBOARD</button>
	</div>
  `
};

//I think you can erase it later
export const emptyFooterView = {
	render: (): string => `
	<footer id="footerSettings" class="bg-[#fbd11b] p-4">
	</footer>
	`
};