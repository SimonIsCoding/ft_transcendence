import { renderBackButton } from '../sidebarUtils.ts'

export function dashboardSubmenuRender(): string
{
	return `
	<div id="dashboardSubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex flex-col overflow-auto">
		${renderBackButton("backBtnDasboardSubmenu")}
		<div id="dashboard-container" class="flex-1"></div>
	</div>
	`
}
