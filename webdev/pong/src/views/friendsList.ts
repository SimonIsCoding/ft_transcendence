// // import { userLoggedSidebar } from "./sidebarBehavior";

// interface User {
//   login: string;
//   password: string;
//   mail: string;
//   token: string;
// }

// export const friendsListView = {
//   currentUser: null as User | null,
//   isLogin: true,

//  render(): string {
// 	//  ${userLoggedSidebar.render()}
// 	return `

// 	<div id="friendsInterface" class="fixed inset-0 flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full z-50" style="background-image: url('/pongBackgroundPlay.png');">
// 		<div class="relative bg-zinc-900 text-white rounded-xl p-8 w-3/4 max-w-5xl shadow-xl space-y-6">

// 			<!-- Bouton de fermeture -->
// 			<button id="closeFriendsInterface" class="absolute top-4 right-4 text-white text-2xl hover:text-yellow-400 transition">
// 				&times;
// 			</button>

// 			<!-- Barre de recherche -->
// 			<div class="flex items-center space-x-4">
// 				<input type="text" placeholder="Search for a friend..." 
// 					class="flex-1 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
// 				<button class="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition">
// 					Add Friend
// 				</button>
// 			</div>

// 			<!-- Listes d'amis -->
// 			<div class="grid grid-cols-2 gap-6">
// 				<!-- Pending -->
// 				<div>
// 					<h2 class="text-xl font-semibold mb-2">Pending</h2>
// 					<div id="pendingFriends" class="bg-zinc-800 p-4 rounded-lg space-y-2 min-h-[200px]">
// 					</div>
// 				</div>

// 				<!-- Added -->
// 				<div>
// 					<h2 class="text-xl font-semibold mb-2">Friends</h2>
// 					<div id="addedFriends" class="bg-zinc-800 p-4 rounded-lg space-y-2 min-h-[200px]">
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
//   `;
//   },

//   init(): void
//   {
// 	// userLoggedSidebar.init();

// 	const friendsListBtn = document.getElementById('friendsListBtn') as HTMLButtonElement | null ;
// 	friendsListBtn?.addEventListener('click', () => {
// 	const existing = document.getElementById('friendsInterface');
// 	if (!existing) {
// 		document.body.insertAdjacentHTML('beforeend', friendsListView.render());

// 		const closeBtn = document.getElementById('closeFriendsInterface');
// 		closeBtn?.addEventListener('click', () => {
// 			document.getElementById('friendsInterface')?.remove();
// 		});
// 	}
// });	
//   }
// }