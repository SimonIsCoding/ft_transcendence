export const loggedController = {
  init(): void
  {
	const playSidebarBtn = document.getElementById('playSidebarBtn');
	const playSubmenu = document.getElementById('playSubmenu');
	const sidebar = document.getElementById('sidebar');

	if (playSidebarBtn && playSubmenu && sidebar)
	{
		playSidebarBtn.addEventListener('click', () => {
			playSubmenu?.classList.toggle('max-h-0');
  			playSubmenu?.classList.toggle('max-h-screen');//max-w-48
			sidebar.classList.toggle('expanded');
		});
	}

  }
};