import { Router } from './router.ts';
import { initLoginAndRegistration } from './services/loginAndRegistration.ts';

// Initialize on load
window.addEventListener('load', () => {
  const path = window.location.pathname;
  Router.navigate(
  path.includes('dashboard') ? 'dashboard' :
  path.includes('login') ? 'login' :
  'home'
);
  initLoginAndRegistration();
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