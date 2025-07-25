export const loggedController = {
  init(): void
  {
	const playSidebarBtn = document.getElementById('playSidebarBtn');
	const playSubmenu = document.getElementById('playSubmenu');

	if (playSidebarBtn && playSubmenu)
	{
		playSidebarBtn.addEventListener('click', () => {
			const isHidden = playSubmenu.classList.contains('hidden');
			playSubmenu.classList.toggle('hidden', !isHidden); // toggle visibility
		});
	}

  }
};