export const loggedController = {
  init(): void
  {
	const playSidebarBtn = document.getElementById('playSidebarBtn');
	const playSubmenu = document.getElementById('playSubmenu');
	const sidebar = document.getElementById('sidebar');
	sidebar?.classList.toggle('w-[6%]');
	sidebar?.classList.toggle('w-[20%]');

	if (playSidebarBtn && playSubmenu && sidebar)
	{
		playSidebarBtn.addEventListener('click', () => {
			playSubmenu.classList.toggle('hidden');
			sidebar.classList.toggle('expanded');
		});
	}

  }
};