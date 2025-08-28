export function gameSettingsSubmenuRender():string 
{
	return `
	<div id="settingsSubmenu" class="submenu h-screen w-full absolute top-0 bg-[#fbd11b] flex flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		<p id="submenuSettingsName" class="font-bold text-center pt-5">Game Settings</p>
		<hr class="w-full border-t-1.5 border-black" />
		<div class="flex items-center pt-5 w-full">
			<label for="iaDifficulty" class="font-bold basis-[40%] whitespace-nowrap text-sm pl-2 text-center">
				AI Difficulty
			</label>
			<input id="iaDifficultySliderInput" type="range" min="1" max="3" value="2"
				class="basis-[40%] h-1 rounded cursor-pointer" />
			<span id="iaDifficultyValue" class="font-bold basis-[20%] text-center font-mono">
				Medium
			</span>
		</div>
		<div class="flex items-center pt-5 w-full">
			<label for="scoreLimitSlider" class="font-bold basis-[40%] whitespace-nowrap text-sm pl-2 text-center">
				Score Limit
			</label>
			<input id="scoreLimitSliderInput" type="range" min="1" max="3" value="2"
				class="basis-[40%] h-1 rounded cursor-pointer" />
			<span id="scoreLimitValue" class="font-bold basis-[20%] text-center font-mono">
				5
			</span>
		</div>
	</div>
	`
}