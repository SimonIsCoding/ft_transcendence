import { renderBackButton } from './sidebarUtils.ts'

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
			<div class="flex flex-row-reverse w-full h-1/3">
				<!-- this is the first column -->
				<div class="w-1/2 rounded-2xl flex flex-col justify-between ml-0.5">
					<div class="w-full h-1/2 bg-black rounded-2xl mb-0.5"></div>
					<div class="w-full h-1/2 bg-black rounded-2xl mt-0.5"></div>
				</div>
				<div class="w-1/2 rounded-2xl flex flex-col justify-between mr-0.5">
					<div class="w-full h-1/2 bg-black rounded-2xl mb-0.5"></div>
					<div class="w-full h-1/2 bg-black rounded-2xl mt-0.5"></div>
				</div>
			</div>
			<div class="w-full h-1/3 bg-black rounded-2xl"></div>
			<div class="w-full h-1/3 bg-black rounded-2xl"></div>
		</div>
	</div>
	`
}
