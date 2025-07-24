import { Router } from './router.ts';

// Initialize on load
window.addEventListener('load', () => {
  const path = window.location.pathname;
  Router.navigate(
	path.includes('login') ? 'login' :
	path.includes('register') ? 'register' :
	path.includes('play') ? 'play' :
	path.includes('game') ? 'game' :
	path.includes('info') ? 'info' : 
	'home' , false);
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  Router.navigate(
	path.includes('login') ? 'login' :
	path.includes('register') ? 'register' :
	path.includes('play') ? 'play' :
	path.includes('game') ? 'game' :
	path.includes('info') ? 'info' : 
	'home' , false);
});