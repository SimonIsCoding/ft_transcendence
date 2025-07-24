export function isValidEmail(email: string): boolean
{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function setupPasswordToggle(passwordId: string, toggleBtnId: string, eyeClosedIconId: string, eyeOpenIconId: string): void
{
	const input = document.getElementById(passwordId) as HTMLInputElement | null;
	const toggleBtn = document.getElementById(toggleBtnId);
	const eyeClosed = document.getElementById(eyeClosedIconId);
	const eyeOpened = document.getElementById(eyeOpenIconId);

	if (!input || !toggleBtn || !eyeOpened || !eyeClosed)
		return;

	let isVisible = false;

	toggleBtn.addEventListener("click", () => {
		isVisible = !isVisible;
		input.type = isVisible ? "text" : "password";
		eyeOpened.classList.toggle("hidden", !isVisible);
		eyeClosed.classList.toggle("hidden", isVisible);
	});
}

export function showSuccessPopup(message: string, duration: number = 5000): void {
	const popup = document.getElementById("successPopup");
	if (!popup)
		return;
	
	popup.textContent = message;
	popup.classList.remove("hidden");

	setTimeout(() => {
		popup.classList.add("hidden");
	}, duration);
}