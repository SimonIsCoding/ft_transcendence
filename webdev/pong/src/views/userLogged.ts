import { Router } from "../router";

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

export const userLogged = {
  currentUser: null as User | null,
  isLogin: true,

 render(): string {
	return `
	<div id="successPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
	</div>
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">

	  <!-- Sidebar -->
	  <div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-1/24">
		<img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>

		<div id="sidebarMiddlePart" class="h-full flex flex-col items-center justify-center space-y-4">
			<button id="playSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M8 5v14l11-7z"/>
			</svg>
			</button>
			<!-- Hidden submenu -->
			<div id="playSubmenu" class="h-screen absolute left-1/24 top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
				<p id="submenuName" class="text-center pt-5">Play</p>
				<button id="oneVsOneBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">1 vs 1</button>
				<button id="oneVsAiBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">1 vs AI</button>
				<button id="tournamentBtn" class="border border-black rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Tournament</button>
			</div>


			<button id="profileSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
			<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
			</svg>
			</button>
			<!-- Hidden submenu -->
			<div id="profileSubmenu" class="h-screen absolute left-1/24 top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
				<p id="submenuProfileName" class="font-bold text-center pt-5">Profile</p>
				<hr class="border-t-1.5 border-black w-full" />
				
				<!-- <button id="uploadPicture" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Upload Picture</button> -->
				
				<input type="file" id="uploadProfilePictureInput" accept="image/*" class="hidden">
				<button id="uploadPictureBtn" class="relative w-24 h-24 bg-black rounded-full flex items-center justify-center group hover:bg-[#fbd11b] transition border border-transparent hover:border-black">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#fbd11b] group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
					</svg>
					<span class="absolute bottom-0 right-0 bg-[#fbd11b] text-black rounded-full w-5 h-5 flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition">+</span>
				</button>
				<img id="preview" class="mt-4 w-32 h-32 object-cover rounded-full hidden" />
				
				<hr class="border-t-1 border-black w-20" />
				<button id="DashboardBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Dashboard</button>
				<hr class="border-t-1 border-black w-20" />
				<button id="friendsListBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Friends list</button>
				<hr class="border-t-1 border-black w-20" />
				<button id="editProfileBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit ">Edit Profile</button>
			</div>
			
			<button id="settingsSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
			<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M19.4 13c.04-.33.1-.66.1-1s-.06-.67-.1-1l2.1-1.65c.2-.16.25-.45.1-.67l-2-3.46a.504.504 0 0 0-.61-.22l-2.5 1c-.5-.38-1.05-.7-1.65-.94L14 2.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5L9.15 5c-.6.24-1.15.56-1.65.94l-2.5-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .1.67L4.6 11c-.04.33-.1.66-.1 1s.06.67.1 1L2.5 14.65a.5.5 0 0 0-.1.67l2 3.46c.14.22.42.3.65.22l2.5-1c.5.38 1.05.7 1.65.94L10 21.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5l.35-2.35c.6-.24 1.15-.56 1.65-.94l2.5 1c.23.08.51 0 .65-.22l2-3.46a.5.5 0 0 0-.1-.67L19.4 13zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>
			</svg>
			</button>
			<!-- Hidden submenu -->
			<div id="settingsSubmenu" class="h-screen absolute left-1/24 top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
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
	  </div>

	  <!-- Game Area -->
		<main id="gameArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
			<button id="playBtn" class="text-[#fbd11b] text-5xl rounded-lg border border-[#fbd11b] px-12 py-6 rounded-lg hover:bg-[#fbd11b] hover:text-black transition">
			PLAY
			</button>
		</main>

	</div>
  `;
  },

  init(): void
  {
	const playSidebarBtn = document.getElementById('playSidebarBtn');
	const playSubmenu = document.getElementById('playSubmenu');
	const sidebar = document.getElementById('sidebar');

	if (playSidebarBtn && playSubmenu && sidebar)
	{
		playSidebarBtn.addEventListener('click', () => {
			playSubmenu?.classList.toggle('max-h-0');
  			playSubmenu?.classList.toggle('max-h-screen');//max-w-48
			sidebar.classList.toggle('expanded');
		});
	}


		const profileSidebarBtn = document.getElementById('profileSidebarBtn');
	const profileSubmenu = document.getElementById('profileSubmenu');
	if (profileSidebarBtn && profileSubmenu && sidebar)
	{
		profileSidebarBtn.addEventListener('click', () => {
			profileSubmenu?.classList.toggle('max-h-0');
  			profileSubmenu?.classList.toggle('max-h-screen');//max-w-48
			sidebar.classList.toggle('expanded');
		});
	}

	const settingsSidebarBtn = document.getElementById('settingsSidebarBtn');
	const settingsSubmenu = document.getElementById('settingsSubmenu');
	if (settingsSidebarBtn && settingsSubmenu && sidebar)
	{
		settingsSidebarBtn.addEventListener('click', () => {
			settingsSubmenu?.classList.toggle('max-h-0');
  			settingsSubmenu?.classList.toggle('max-h-screen');//max-w-48
			sidebar.classList.toggle('expanded');
		});
	}
	
	const playBtn = document.getElementById('playBtn') as HTMLButtonElement | null;
	playBtn!.addEventListener('click', () => { Router.navigate('game'); })

	const logoutSidebarBtn = document.getElementById('logoutSidebarBtn') as HTMLButtonElement | null;
	logoutSidebarBtn!.addEventListener('click', () => Router.navigate('home'));
  }
};
