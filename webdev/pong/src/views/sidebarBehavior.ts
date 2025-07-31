import { Router } from "../router";
import { friendsListView } from "./friendsList"
import { initSidebarBehavior } from "../services/sidebar"

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

export const userUnloggedSidebar = {
  currentUser: null as User | null,

 render(): string {
	return `
	<!-- Sidebar 
      <div id="sidebar" class="w-1/24 bg-[#fbd11b] flex flex-col transition-all duration-500 ease-in-out overflow-hidden group" style="min-height: 100vh">-->
        <img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>


		<div class="flex flex-col mt-auto items-center space-y-2 pb-6">
			<button id="loginBtn" class="w-12 border border-black rounded-lg text-sm text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Login</button>
			<button id="registerBtn" class="w-15 border border-black rounded-lg text-[0.825rem] text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Register</button>
		</div>
      <!-- </div> -->
	 `;
  },

  init(): void
  {
	const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement | null;
	loginBtn!.addEventListener('click', () => { Router.navigate('login'); })

	const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement | null;
	registerBtn!.addEventListener('click', () => { Router.navigate('register'); })
  }
}

export const userLoggedSidebar = {
  currentUser: null as User | null,
  isLogin: true,

 render(): string {
	return `
	<!-- Sidebar
	<div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-1/24"> -->
	<img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>

		<div id="sidebarMiddlePart" class="h-full flex flex-col items-center justify-center space-y-4">
			<button id="playSidebarBtn" data-target="playSubmenu" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M8 5v14l11-7z"/>
			</svg>
			</button>
			<!-- Hidden submenu -->
			<div id="playSubmenu" class="submenu h-screen absolute left-1/24 top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
				<p id="submenuName" class="text-center pt-5">Play</p>
				<button id="oneVsOneBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">1 vs 1</button>
				<button id="oneVsAiBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">1 vs AI</button>
				<button id="tournamentBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Tournament</button>
			</div>

			<button id="profileSidebarBtn" data-target="profileSubmenu" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
			<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
			</svg>
			</button>
			<!-- Hidden submenu -->
			<div id="profileSubmenu" class="submenu h-screen absolute left-1/24 top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
				<p id="submenuProfileName" class="font-bold text-center pt-5">Profile</p>
				<hr class="border-t-1.5 border-black w-full" />
				<input type="file" id="uploadProfilePictureInput" accept="image/*" class="hidden">
				<button id="uploadPictureBtn" class="relative w-24 h-24 bg-black rounded-full flex items-center justify-center border border-transparent hover:border-black group hover:bg-[#fbd11b] transition">
					<svg id="uploadIcon" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#fbd11b] group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
					</svg>
					<span class="absolute bottom-0 right-0 z-20 bg-[#fbd11b] text-black rounded-full w-5 h-5 flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md">+</span>
					<img id="previewProfilePicture" class="absolute w-24 h-24 rounded-full object-cover hidden" />
				</button>
				<hr class="border-t-1 border-black w-20" />
				<button id="DashboardBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Dashboard</button>
				<hr class="border-t-1 border-black w-20" />
				<button id="friendsListBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Friends list</button>
				<hr class="border-t-1 border-black w-20" />
				<button id="editProfileBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Edit Profile</button>
			</div>
			
			<button id="settingsSidebarBtn" data-target="settingsSubmenu" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
			<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M19.4 13c.04-.33.1-.66.1-1s-.06-.67-.1-1l2.1-1.65c.2-.16.25-.45.1-.67l-2-3.46a.504.504 0 0 0-.61-.22l-2.5 1c-.5-.38-1.05-.7-1.65-.94L14 2.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5L9.15 5c-.6.24-1.15.56-1.65.94l-2.5-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .1.67L4.6 11c-.04.33-.1.66-.1 1s.06.67.1 1L2.5 14.65a.5.5 0 0 0-.1.67l2 3.46c.14.22.42.3.65.22l2.5-1c.5.38 1.05.7 1.65.94L10 21.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5l.35-2.35c.6-.24 1.15-.56 1.65-.94l2.5 1c.23.08.51 0 .65-.22l2-3.46a.5.5 0 0 0-.1-.67L19.4 13zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>
			</svg>
			</button>
			<!-- Hidden submenu -->
			<div id="settingsSubmenu" class="submenu h-screen absolute left-1/24 top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
				<p id="submenuSettingsName" class="font-bold text-center pt-5">Game Settings</p>
				<hr class="border-t-1.5 border-black w-full" />
				<div class="flex items-center space-x-3">
				<label for="ballSpeedSlider" class="whitespace-nowrap text-sm pl-2">Ball Speed</label>
				<input id="ballSpeedSlider" type="range" min="1" max="10" value="5" class="flex-1 h-1 rounded cursor-pointer w-1/2" />
				<span id="ballSpeedValue" class="w-8 text-center font-mono">5</span>
				</div>
				<input id="ballSpeedSlider" type="range" min="1" max="10" value="5" class="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400 space-y-2"/>
				<input id="ballSpeedSlider" type="range" min="1" max="10" value="5" class="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400 space-y-2"/>
			</div>
		</div>
	
		<div id="sidebarLowPart" class="flex flex-col mt-auto items-center space-y-2 pb-6">
			<button id="logoutSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 hover:bg-black transition">
			<svg xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 24 24" 
				class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
				<path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm4-10H8a2 2 0 0 0-2 2v4h2V5h12v14H8v-4H6v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
			</svg>
			</button>
		</div>
	<!-- </div> -->
  `;
  },

  init(): void
  {
	const dataTargetButtons = document.querySelectorAll('button[data-target]');
	const submenus = document.querySelectorAll<HTMLElement>('.submenu');
	
		dataTargetButtons.forEach(button => {
			button.addEventListener('click', () => {
				const targetId = button.getAttribute('data-target');
	
				submenus.forEach(menu => {
					if (menu.id === targetId)
					{
						menu.classList.toggle('max-h-0');
						menu.classList.toggle('max-h-screen');
					}
					else
					{
						menu.classList.add('max-h-0');
						menu.classList.remove('max-h-screen');
					}
				});
			});
		});
	friendsListView.init();
  }
}

export async function handleSidebar()
{
	const isAuthenticated = await initSidebarBehavior();
	const sidebar = document.getElementById("sidebar");
	if (isAuthenticated)
	{
		console.log("✅ Connected");
		sidebar!.innerHTML = userLoggedSidebar.render();
		userLoggedSidebar.init();
	}
	else
	{
		sidebar!.innerHTML = userUnloggedSidebar.render();
		userUnloggedSidebar.init();
		console.log("❌ Not connected");
	}
}
