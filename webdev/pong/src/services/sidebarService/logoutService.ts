import { Router } from "../../router";
import { showErrorPopup } from "../../utils/utils";
import { manageOthersUsersCard, manageFriendsRequestsCard, manageFriendsCard } from "../../views/sidebar/profileBtn/manageFriendsSubmenu";

export function initLogout() {
  const logoutSidebarBtn = document.getElementById('logoutSidebarBtn');
  
  if (!logoutSidebarBtn) {
    console.error('Logout button not found');
    return;
  }

  logoutSidebarBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default behavior if it's a link
    
    try {
      const response = await fetch('/api/auth/me/sessions', {
        method: 'DELETE', // Changed to POST (more appropriate for logout)
        credentials: 'include', // Necessary for cookies
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }

      // Optional: Clear client-side storage if needed
      localStorage.removeItem('userState');
      sessionStorage.clear();
	  manageFriendsRequestsCard.reset();
	  manageFriendsCard.reset();
	  manageOthersUsersCard.reset();
      Router.navigate('home');
	  showErrorPopup("You have been disconnected", "popup");
      
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: Force redirect if fetch fails
      Router.navigate('home');
    }
  });
}
