import { Router } from './router.ts';

// Initialize on load
window.addEventListener('load', () => {
  const path = window.location.pathname;
  Router.navigate(
  path.includes('info') ? 'info' :
  'home'
);

});

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  Router.navigate(
  path.includes('info') ? 'info' :
  'home'
);
});