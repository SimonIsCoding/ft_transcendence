import { renderBackButton } from './sidebarUtils.ts'

export function gameHistorySubmenuRender():string 
{
	return `
	<div id="gameHistorySubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		${renderBackButton("backBtnGameHistorySubmenu")}
		<p id="gameHistorySubmenuName" class="font-bold text-center pt-5">Game History</p>
		<hr class="w-full border-t-1.5 border-black" />
		${renderGameHistoryCard()}
	</div>
	`
}

function renderGameHistoryCard(): string
{
	return `
	<div class="flex flex-col rounded-2xl w-[90%] h-[10%] space-y-5 shadow-base shadow-gray-600 px-5 py-5 bg-black">
		<div class="flex w-full justify-between items-center text-white text-sm">
			<!-- User -->
			<div class="flex flex-col items-start">
				<span class="font-semibold">Username</span>
				<span class="text-xs text-gray-400">Score: 11</span>
			</div>

			<!-- VS & date -->
			<div class="flex flex-col items-center">
				<span class="font-bold">VS</span>
				<span class="text-xs text-gray-400">04/08/2025</span>
			</div>

			<!-- Opponent -->
			<div class="flex flex-col items-end">
				<span class="font-semibold">Opponent</span>
				<span class="text-xs text-gray-400">Score: 5</span>
			</div>
		</div>
	</div>
	`
}