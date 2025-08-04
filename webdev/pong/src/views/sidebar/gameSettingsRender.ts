export function gameSettingsRender():string 
{
	return `
	<!-- Settings submenu -->
		<div id="settingsSubmenu" class="submenu h-screen w-full absolute top-0 bg-[#fbd11b] flex flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
			<p id="submenuSettingsName" class="font-bold text-center pt-5">Game Settings</p>
			<div class="flex items-center pt-5 w-full">
				<label for="ballSpeedSlider" class="font-bold basis-[35%] whitespace-nowrap text-sm pl-2 text-center">
					Ball Speed
				</label>
				<input id="ballSpeedSlider" type="range" min="1" max="10" value="5"
					class="basis-[40%] h-1 rounded cursor-pointer" />
				<span id="ballSpeedValue" class="font-bold basis-[25%] text-center font-mono">
					5
				</span>
			</div>
			<input id="ballSpeedSlider" type="range" min="1" max="10" value="5" class="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400 space-y-2"/>
			<input id="ballSpeedSlider" type="range" min="1" max="10" value="5" class="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400 space-y-2"/>
		</div>

	</div>
	`
}