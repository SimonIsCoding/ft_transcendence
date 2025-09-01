// For Erik: you can receive the data using this: Game.start(gameSettings);

export const gameSettings = {
	iaDifficulty: "Medium",
	scoreLimit: "7"
};

export function setupGameSettingsListeners()
{
	const iaSlider = document.getElementById("iaDifficultySliderInput") as HTMLInputElement;
	const iaValue = document.getElementById("iaDifficultyValue") as HTMLSpanElement;

	const scoreSlider = document.getElementById("scoreLimitSliderInput") as HTMLInputElement;
	const scoreValue = document.getElementById("scoreLimitValue") as HTMLSpanElement;

	gameSettings.iaDifficulty = getIaLevel(parseInt(iaSlider.value));
	iaValue.textContent = gameSettings.iaDifficulty;

	gameSettings.scoreLimit = getScoreLimit(parseInt(scoreSlider.value));
	scoreValue.textContent = gameSettings.scoreLimit;

	iaSlider.addEventListener("input", e => {
		const value = parseInt((e.target as HTMLInputElement).value);
		gameSettings.iaDifficulty = getIaLevel(value);
		iaValue.textContent = gameSettings.iaDifficulty;
	});

	scoreSlider.addEventListener("input", e => {
		const value = parseInt((e.target as HTMLInputElement).value);
		gameSettings.scoreLimit = getScoreLimit(value);
		scoreValue.textContent = gameSettings.scoreLimit;
	});
}


function getScoreLimit(value: number): string
{
	if (value == 1)
		return "3";
	else if (value == 2)
		return "5";
	else
		return "11";
}

function getIaLevel(value: number): string
{
	if (value == 1)
		return "Easy";
	else if (value == 2)
		return "Medium";
	else
		return "Hard";
}