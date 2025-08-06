import { renderBackButton } from './sidebarUtils.ts'

function barChartSVG(): string
{
	return `
	<svg class="ml-2 mt-1 w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
	<path d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z" stroke-width="2"/>
	<path d="M8 11L8 16" stroke-width="2" stroke-linecap="round"/>
	<path d="M16 13L16 16" stroke-width="2" stroke-linecap="round"/>
	<path d="M12 8L12 16" stroke-width="2" stroke-linecap="round"/>
	</svg>
	`
}

function nbFriendsSVG(): string
{
	return `
	<svg xmlns="http://www.w3.org/2000/svg" class="ml-3 w-10 h-10 text-yellow-400" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
	<circle cx="9" cy="7" r="4" />
	<path d="M2 21v-1a7 7 0 0 1 14 0v1" />
	<path d="M20 8v6" />
	<path d="M17 11h6" />
	</svg>
	`
}

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
		<div class="w-[90%] h-[90%] flex flex-col items-center space-y-4 pb-4">
			<div class="flex flex-row w-full h-1/3">
				<!-- this is the first column -->
				<div class="w-1/2 rounded-2xl flex flex-col justify-between mr-0.5">
					<div class="w-full h-1/2 bg-black rounded-2xl mb-0.5">
						<div class="flex flex-col items-center justify-center text-center mt-2">${barChartSVG()}</div>
						<p id="gameWon" class="text-yellow-400 font-bold text-center justify-center text-base px-4 mb-2">7 wins</p>
					</div>
					<div class="w-full h-1/2 bg-black rounded-2xl mt-0.5">
						<div class="flex flex-col items-center justify-center text-center mt-4">
						${nbFriendsSVG()}
						<p id="nbFriends" class="text-yellow-400 font-bold text-center justify-center text-base px-4 mb-2">2 Friends</p>
						</div>
					</div>
				</div>
				<!-- this is the second column -->
				<div class="w-1/2 rounded-2xl flex flex-col justify-between ml-0.5">
					<div class="w-full h-1/2 bg-black rounded-2xl mb-0.5">
						<div class="flex flex-col items-center justify-center text-center mt-2">${barChartSVG()}</div>
						<p id="gameWon" class="text-yellow-400 font-bold text-center justify-center text-base px-4 mb-2">2 losses</p>
					</div>
					<div class="w-full h-1/2 bg-black rounded-2xl mt-0.5">
						<div class="flex flex-col items-center justify-center text-center mt-2">${barChartSVG()}</div>
						<p id="gameWon" class="text-yellow-400 font-bold text-center justify-center text-base px-4">87 points scored</p>
					</div>
				</div>
			</div>
			<div class="w-full h-1/3 bg-black rounded-2xl"></div>
			<div class="w-full h-1/3 bg-black rounded-2xl"></div>
		</div>
	</div>
	`
}
