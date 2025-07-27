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

export function showSuccessPopup(message: string, duration: number = 3500): void {
	const popup = document.getElementById("successPopup");
	if (!popup)
		return;
	
	popup.textContent = message;
	popup.classList.remove("hidden");

	setTimeout(() => {
		popup.classList.add("hidden");
	}, duration);
}

export async function receiveProfilePicture(file: File): Promise<void>
{
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:3001/uploadProfilePicture', {
    method: 'POST',
    body: formData, //because it's a picture
    credentials: 'include',
  });

  const result = await response.json();

  if (!response.ok || !result.success)
  {
    console.error("Error on upload:", result);
    alert(`Error: ${result.error || 'failed to store the picture.'}`);
    return;
  }
}
