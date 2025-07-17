import { Router } from './router.ts';
// import { initLogin, initRegistration, modifyInfo } from './services/loginAndRegistration.ts';

// Initialize on load
window.addEventListener('load', () => {
  const path = window.location.pathname;
  Router.navigate(
  path.includes('dashboard') ? 'dashboard' :
  path.includes('login') ? 'login' :
  path.includes('info') ? 'info' :
  'home'
);

});

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  Router.navigate(
  path.includes('dashboard') ? 'dashboard' :
  path.includes('login') ? 'login' :
  path.includes('info') ? 'info' :
  'home'
);
});