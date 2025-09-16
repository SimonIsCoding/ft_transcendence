export function getDifficultyLabel(value: number): string
{
	if (value === 2000)
		return "Easy"
	if (value === 1000)
		return "Medium"
	return "Hard"
}

export function convertPaddleSpeed(value: number): string
{
	if (value === 1)
		return "Slow"
	if (value === 2)
		return "Normal"
	return "Fast"
}

export function getPaddleSpeedValue(speed: 1 | 2 | 3): number
{
  return speed;
}

export const gameSettings: {
	iaDifficulty: 2000 | 1000 | 1,
	scoreLimit: 3 | 5 | 11,
	paddleSpeed: 1 | 2 | 3
} = {
	iaDifficulty: 2000,
	scoreLimit: 3,
	paddleSpeed: 1
};

export function getDifficultyValue(difficulty: 2000 | 1000 | 1): number
{
	if (difficulty === 2000)
		return 1;
	if (difficulty === 1000)
		return 2;
	return 3;
}

export function getScoreLimitValue(limit: number): number
{
	if (limit === 3)
		return 1;
	if (limit === 5)
		return 2;
	return 3;
}

export function setupGameSettingsListeners()
{
	const iaSlider = document.getElementById("iaDifficultySliderInput") as HTMLInputElement;
	const iaValue = document.getElementById("iaDifficultyValue") as HTMLSpanElement;

	const scoreSlider = document.getElementById("scoreLimitSliderInput") as HTMLInputElement;
	const scoreValue = document.getElementById("scoreLimitValue") as HTMLSpanElement;

	const paddleSlider = document.getElementById("paddleSpeedSliderInput") as HTMLInputElement;
	const paddleValue = document.getElementById("paddleSpeedValue") as HTMLSpanElement;

	iaSlider.addEventListener("input", e => {
		const value = parseInt((e.target as HTMLInputElement).value);
		gameSettings.iaDifficulty = value === 1 ? 2000 : value === 2 ? 1000 : 1;
		iaValue.textContent = getDifficultyLabel(gameSettings.iaDifficulty);
	});

	scoreSlider.addEventListener("input", e => {
		const value = parseInt((e.target as HTMLInputElement).value);
		gameSettings.scoreLimit = value === 1 ? 3 : value === 2 ? 5 : 11;
		scoreValue.textContent = gameSettings.scoreLimit.toString();
	});

	paddleSlider.addEventListener("input", e => {
		const value = parseInt((e.target as HTMLInputElement).value) as 1 | 2 | 3;
		gameSettings.paddleSpeed = value;
		paddleValue.textContent = convertPaddleSpeed(gameSettings.paddleSpeed);
	});
}