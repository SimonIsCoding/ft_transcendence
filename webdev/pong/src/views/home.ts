import { menuController } from '../controllers/menu/menuController';

interface User {
  login: string;
  password: string;
  mail: string;
  token: string;
}

export const HomeView = {
  currentUser: null as User | null,
  isLogin: true,

 render(): string {
	return `
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">

      <!-- Sidebar -->
      <div id="sidebar" class="w-1/24 bg-[#fbd11b] flex flex-col transition-all duration-500 ease-in-out overflow-hidden group" style="min-height: 100vh">
        <img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>


		<div class="flex flex-col mt-auto items-center space-y-2 pb-6">
			<button id="loginBtn" class="w-12 border border-black rounded-lg text-sm text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Login</button>
			<button id="registerBtn" class="w-15 border border-black rounded-lg text-[0.825rem] text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Register</button>
		</div>
      </div>

      <!-- Game Area -->
      <div id="gameArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
        <button id="playBtn" class="text-yellow-400 text-5xl rounded-lg border border-yellow-400 px-12 py-6 rounded-lg hover:bg-[#fbd11b] hover:text-black transition">
          PLAY
        </button>
      </div>
    </div>
  `;
  },

    init(): void
  {
	menuController.init();
  }

//     return `
//       <div class="flex flex-col min-h-screen bg-[#fbd11b] text-black">
        
// 	 	<header class="flex justify-center items-center h-24 bg-[#fbd11b]">
//           <img src="/pong-logo.png" alt="PONG Logo" class="h-16">
//           <a href="/login" id="loginIcon" class="hidden absolute right-6 top-6">
//             <img src="/loginIcon.png" alt="Login" class="h-8 w-8" />
//           </a>
//           <a href="/logged" id="loggedIcon" class="hidden absolute right-6 top-6">
//             <img src="/loggedIcon.png" alt="Logged" class="h-8 w-8" />
//           </a>
// 		  <div id="successPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
// 		  </div>
//         </header>

//         <main id="main-content" class="flex-1 flex items-center justify-center bg-[#fbd11b] overflow-y-auto min-h-[450px]">
// 		<div id="fullCanva" class="relative flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
// 			<div class="absolute left-1/2 top-0 h-full border-l-4 border-white opacity-50 border-dashed -translate-x-1/2">
// 			</div>
// 			<div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-black">
// 				<button id="loginBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded">LOGIN</button>
// 				<button id="registerBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded">REGISTER</button>
// 			</div>
// 			<div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
// 				<button id="playBtn" class="font-seven text-white px-6 py-3 text-5xl border border-white rounded">PLAY</button>
// 			</div>
// 		</div>
//         </main>
//         <footer id="footerSettings" class="bg-[#fbd11b] p-4">
//         </footer>
//       </div>
//     `;
};
