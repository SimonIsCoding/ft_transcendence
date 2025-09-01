import { renderBackButton } from '../sidebarUtils.ts'

// class="w-[90%] h-[90%] flex flex-col items-center space-y-4 pb-4

export function dashboardSubmenuRender():string 
{
	return `
	<div id="dashboardSubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		${renderBackButton("backBtnDasboardSubmenu")}
		<p id="submenuDashboardName" class="font-bold text-center pt-5">Dashboard</p>
		<hr class="w-full border-t-1.5 border-black" />
		<div class="w-full text-left pl-[7%]">
			<p id="playerNameDashboard" class="font-bold text-gray-500">Username</p>
		</div>
		<div ">
			<div class="bg-custom-yellow h-screen shadow-lg p-2 space-y-2 flex flex-col" style="border-radius:0;width:256px;min-width:256px;max-width:256px;overflow:hidden;">
				<div class="flex justify-between items-center px-1">
					<h2 id="username" class="hidden text-base font-bold text-custom-black truncate"></h2>
					<svg xmlns="http://www.w3.org/2000/svg" class="hidden h-5 w-5 text-custom-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
				</div>
				<div class="grid grid-cols-2 gap-1">
					<div class="bg-custom-black rounded-xl p-1 text-center">
					<div class="bg-gray-700 rounded-full w-6 h-6 mx-auto flex items-center justify-center mb-1">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-custom-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
					</div>
					<p id="total-won" class="text-base font-bold text-custom-white"></p>
					<p class="text-xs text-gray-400">Won</p>
					</div>
					<div class="bg-custom-black rounded-xl p-1 text-center">
					<div class="bg-gray-700 rounded-full w-6 h-6 mx-auto flex items-center justify-center mb-1">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-custom-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
					</div>
					<p id="total-lost" class="text-base font-bold text-custom-white"></p>
					<p class="text-xs text-gray-400">Lost</p>
					</div>
					<div class="bg-custom-black rounded-xl p-1 text-center">
					<div class="bg-gray-700 rounded-full w-6 h-6 mx-auto flex items-center justify-center mb-1">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-custom-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
					</div>
					<p id="total-scores" class="text-base font-bold text-custom-white"></p>
					<p class="text-xs text-gray-400">Scores</p>
					</div>
					<div class="bg-custom-black rounded-xl p-1 text-center">
					<div class="bg-gray-700 rounded-full w-6 h-6 mx-auto flex items-center justify-center mb-1">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-custom-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
					</div>
					<p id="total-friends" class="text-base font-bold text-custom-white"></p>
					<p class="text-xs text-gray-400">Friends</p>
					</div>
				</div>
				<div class="bg-custom-black rounded-2xl p-4">
					<h3 class="text-xl font-bold text-custom-white mb-4">Total Points</h3>
					<div id="bar-chart"></div>
					<div class="flex justify-center items-center space-x-6 mt-4">
					<div class="flex items-center space-x-2">
						<div class="w-3 h-3 rounded-full bg-custom-yellow"></div>
						<span class="text-sm text-gray-400">Scored</span>
					</div>
					<div class="flex items-center space-x-2">
						<div class="w-3 h-3 rounded-full bg-custom-white"></div>
						<span class="text-sm text-gray-400">Received</span>
					</div>
					</div>
				</div>
				<div class="bg-custom-black rounded-2xl p-4">
					<h3 class="text-xl font-bold text-custom-white mb-4">Wons & Lost</h3>
					<div id="donut-chart" class="relative"></div>
					<div class="flex justify-center items-center space-x-6 mt-4">
					<div class="flex items-center space-x-2">
						<div class="w-3 h-3 rounded-full bg-custom-yellow"></div>
						<span id="won-percentage" class="text-sm text-gray-400"></span>
					</div>
					<div class="flex items-center space-x-2">
						<div class="w-3 h-3 rounded-full bg-custom-white"></div>
						<span id="lost-percentage" class="text-sm text-gray-400"></span>
					</div>
				</div>
			</div>

			</div>
			<div class="w-full h-1/3 bg-black rounded-2xl"></div>
			<div class="w-full h-1/3 bg-black rounded-2xl"></div>
		</div>
	</div>
	`
}
