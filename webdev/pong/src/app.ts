import { Router } from './router.ts';
import { handleSidebar } from './views/sidebar/sidebarBehavior.ts';

// Initialize on load
window.addEventListener('load', () => {
  handleSidebar();   // ✅ setup

  const path = window.location.pathname;
  Router.navigate(
	path.includes('login') ? 'login' :
	path.includes('register') ? 'register' :
	path.includes('gameai') ? 'gameai' :
	path.includes('game') ? 'game' :
	path.includes('tournament') ? 'tournament' :
	'home' , 
    false
  );
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  Router.navigate(
	path.includes('login') ? 'login' :
	path.includes('register') ? 'register' :
	path.includes('gameai') ? 'gameai' :
	path.includes('game') ? 'game' :
	path.includes('tournament') ? 'tournament' :
	'home' ,
    false);
});
