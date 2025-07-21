import { HomeView } from './views/home';
import { infoView } from './views/menu';

export class Router {
  private static app = document.getElementById('app');

//   public static navigate(page: 'home' | 'info'): void {
//     if (!this.app) {
//       console.error('App container not found');
//       return;
//     }

//     // Clear previous view
//     this.app.innerHTML = '';

// 	const fullCanva = document.getElementById('fullCanva');
// 	if (fullCanva)
// 		fullCanva.innerHTML = infoView.render();

//     // Handle route protection

//     switch (page)
// 	{
//       case 'home':
//         this.app.innerHTML = HomeView.render();
// 		HomeView.init();
//         break;

// 	  case "info":
// 	  	// this.app.innerHTML = infoView.render();
// 		fullCanva!.innerHTML = infoView.render();
// 	  	break;
//     }

//     // Update browser history
//     history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
//   }
public static navigate(page: 'home' | 'info', addToHistory = true): void {
  if (!this.app) {
    console.error('App container not found');
    return;
  }

  // Handle route protection + rendering
  switch (page) {
    case 'home':
      this.app.innerHTML = HomeView.render();
      HomeView.init();
      break;

    case 'info':
      const fullCanva = document.getElementById('fullCanva');
      if (fullCanva)
        fullCanva.innerHTML = infoView.render();
      break;
  }

  if (addToHistory)
    history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
}

  public static init(): void {
    // Handle initial load
    window.addEventListener('load', () => {
      const path = window.location.pathname;
	  this.navigate(path.includes('info') ? 'info' : 'home', false);

    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
	  this.navigate(path.includes('info') ? 'info' : 'home', false);

    });
  }
}

// Initialize router when imported
Router.init();