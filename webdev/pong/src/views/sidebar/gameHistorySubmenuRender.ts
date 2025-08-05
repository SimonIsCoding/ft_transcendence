import { renderBackButton } from './sidebarUtils.ts'

export function gameHistorySubmenuRender():string 
{
	return `
	<div id="gameHistorySubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		${renderBackButton("backBtnGameHistorySubmenu")}
		<p id="gameHistorySubmenuName" class="font-bold text-center pt-5">Game History</p>
		<hr class="w-full border-t-1.5 border-black" />
	</div>
	`
}
