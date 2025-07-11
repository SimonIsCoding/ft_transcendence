import { Router } from './router.ts';
import { initSimonFeatures } from './services/simonFeatures.ts';

// Initialize on load
window.addEventListener('load', () => {
  const path = window.location.pathname;
  Router.navigate(
  path.includes('dashboard') ? 'dashboard' :
  path.includes('login') ? 'login' :
  'home'
);
  initSimonFeatures();
});


// Handle browser back/forward
window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  Router.navigate(
  path.includes('dashboard') ? 'dashboard' :
  path.includes('login') ? 'login' :
  'home'
);
});