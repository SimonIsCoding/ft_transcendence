export function getDifficultyLabel(value: number): string
{
	if (value === 1000)
		return "Easy"
	if (value === 750)
		return "Medium"
	return "Hard"
}

export const gameSettings: {
	iaDifficulty: 1000 | 750 | 1,
	scoreLimit: 3 | 5 | 11
} = {
	iaDifficulty: 1000,
	scoreLimit: 3
};

export function setupGameSettingsListeners()
{
	const iaSlider = document.getElementById("iaDifficultySliderInput") as HTMLInputElement;
	const iaValue = document.getElementById("iaDifficultyValue") as HTMLSpanElement;

	const scoreSlider = document.getElementById("scoreLimitSliderInput") as HTMLInputElement;
	const scoreValue = document.getElementById("scoreLimitValue") as HTMLSpanElement;

	// gameSettings.iaDifficulty = getAiLevel(parseInt(iaSlider.value));
	// iaValue.textContent = gameSettings.iaDifficulty;

	// gameSettings.scoreLimit = getScoreLimit(parseInt(scoreSlider.value));
	// scoreValue.textContent = gameSettings.scoreLimit;

	iaSlider.addEventListener("input", e => {
		const value = parseInt((e.target as HTMLInputElement).value);
		gameSettings.iaDifficulty = value === 1 ? 1000 : value === 2 ? 750 : 1;
		iaValue.textContent = getDifficultyLabel(gameSettings.iaDifficulty);
	});

	scoreSlider.addEventListener("input", e => {
		const value = parseInt((e.target as HTMLInputElement).value);
		gameSettings.scoreLimit = value === 1 ? 3 : value === 2 ? 5 : 11;
		scoreValue.textContent = gameSettings.scoreLimit.toString();
	});

	// const saveBtnGameSettings = document.getElementById("saveBtnGameSettings") as HTMLInputElement;
}


// function getScoreLimit(value: number): string
// {
// 	if (value == 1)
// 		return "3";
// 	else if (value == 2)
// 		return "5";
// 	else
// 		return "11";
// }

// function getAiLevel(value: number): string
// {
// 	if (value == 1)
// 		return "Easy";
// 	else if (value == 2)
// 		return "Medium";
// 	else
// 		return "Hard";
// }