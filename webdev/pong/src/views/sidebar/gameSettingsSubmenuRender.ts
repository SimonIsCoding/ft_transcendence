export function gameSettingsSubmenuRender():string 
{
	return `
	<!-- Settings submenu -->
		<div id="settingsSubmenu" class="submenu h-screen w-full absolute top-0 bg-[#fbd11b] flex flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
			<p id="submenuSettingsName" class="font-bold text-center pt-5">Game Settings</p>
			<hr class="w-full border-t-1.5 border-black" />
			<div class="flex items-center pt-5 w-full">
				<label for="ballSpeedSlider" class="font-bold basis-[40%] whitespace-nowrap text-sm pl-2 text-center">
					Ball Speed
				</label>
				<input id="ballSpeedSliderInput" type="range" min="1" max="10" value="5"
					class="basis-[40%] h-1 rounded cursor-pointer" />
				<span id="ballSpeedValue" class="font-bold basis-[20%] text-center font-mono">
					5
				</span>
			</div>
			<div class="flex items-center pt-5 w-full">	
				<label for="paddleSizeSlider" class="font-bold basis-[40%] whitespace-nowrap text-sm pl-2 text-center">
					Paddle Size
				</label>
				<input id="paddleSizeSliderInput" type="range" min="1" max="10" value="5"
					class="basis-[40%] h-1 rounded cursor-pointer" />
				<span id="paddleSizeValue" class="font-bold basis-[20%] text-center font-mono">
					M
				</span>
			</div>
			<div class="flex items-center pt-5 w-full">
				<label for="scoreLimitSlider" class="font-bold basis-[40%] whitespace-nowrap text-sm pl-2 text-center">
					Score Limit
				</label>
				<input id="scoreLimitSliderInput" type="range" min="5" max="21" value="11"
					class="basis-[40%] h-1 rounded cursor-pointer" />
				<span id="scoreLimitValue" class="font-bold basis-[20%] text-center font-mono">
					11
				</span>
			</div>
		</div>
	</div>
	`
}