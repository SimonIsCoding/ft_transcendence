import { convertPaddleSpeed, gameSettings, getDifficultyLabel, getDifficultyValue, getPaddleSpeedValue, getScoreLimitValue } from "../../../controllers/gameSettingsControllers";

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
			<input id="iaDifficultySliderInput" type="range" min="1" max="3" value="${getDifficultyValue(gameSettings.iaDifficulty)}"
				class="basis-[40%] h-1 rounded cursor-pointer" />
			<span id="iaDifficultyValue" class="font-bold basis-[20%] text-center font-mono">
				${getDifficultyLabel(gameSettings.iaDifficulty)}
			</span>
		</div>
		<div class="flex items-center pt-5 w-full">
			<label for="scoreLimitSlider" class="font-bold basis-[40%] whitespace-nowrap text-sm pl-2 text-center">
				Score Limit
			</label>
			<input id="scoreLimitSliderInput" type="range" min="1" max="3" value="${getScoreLimitValue(gameSettings.scoreLimit)}"
				class="basis-[40%] h-1 rounded cursor-pointer" />
			<span id="scoreLimitValue" class="font-bold basis-[20%] text-center font-mono">
				${gameSettings.scoreLimit}
			</span>
		</div>
		<div class="flex items-center pt-5 w-full">
			<label for="paddleSpeedSlider" class="font-bold basis-[40%] whitespace-nowrap text-sm pl-2 text-center">
				Paddle Speed
			</label>
			<input id="paddleSpeedSliderInput" type="range" min="1" max="3" value="${getPaddleSpeedValue(gameSettings.paddleSpeed)}"
				class="basis-[40%] h-1 rounded cursor-pointer" />
			<span id="paddleSpeedValue" class="font-bold basis-[20%] text-center font-mono">
				${convertPaddleSpeed(gameSettings.paddleSpeed)}
			</span>
		</div>
	</div>
	`
}