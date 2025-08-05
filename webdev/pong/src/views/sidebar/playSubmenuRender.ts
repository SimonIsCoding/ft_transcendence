export function playSubmenuRender(): string
{
	return `
	<div id="playSubmenu" class="submenu h-screen absolute left-[64px] top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col max-h-0 overflow-hidden transition-[max-height] duration-450 z-50 space-y-5">
		<p id="submenuName" class="font-bold text-center pt-5">Play</p>
		<hr class="w-full border-t-1.5 border-black" />
		<button id="oneVsOneBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">1 vs 1</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="oneVsAiBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">1 vs AI</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="tournamentBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">Tournament</button>
	</div>
	`
}