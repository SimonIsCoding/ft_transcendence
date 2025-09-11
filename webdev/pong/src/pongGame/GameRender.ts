
export class GameRender {
    render(): string {
        return `

  <!-- Main container - remaining width -->
  <div class="flex-1 h-screen flex flex-col" style="background-color: #fbd11b;">
    <!-- Top yellow border - 2% -->
    <div class="h-[2vh]" style="background-color: #fbd11b;"></div>

    <!-- Middle section - 96% -->
    <div class="h-[96vh] flex relative">
      <!-- Game area with rounded corners -->
      <div id="game-area" class="flex-1 mr-[2vw] rounded-lg relative flex flex-col transition-all duration-300" style="background-color: #191A1A;">
        <!-- Game content wrapper -->
        <div id="game-content" class="absolute inset-0 rounded-lg">
          <!-- Center dotted line using simple HTML elements -->
          <div class="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 opacity-80 flex flex-col justify-around">
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
          </div>
          <!-- Score area at top -->
          <div class="flex justify-center items-center px-10 py-5 h-[20vh] z-10">
            <div class="flex flex-col items-center text-center w-1/2">
              <div class="text-lg font-bold mb-4 tracking-[2px]" style="color: #D9D9D9;" id="left-player"></div>
              <div class="text-6xl font-bold leading-none" style="color: #D9D9D9;" id="left-score">0</div>
            </div>
            <div class="flex flex-col items-center text-center w-1/2">
              <div class="text-lg font-bold mb-4 tracking-[2px]" style="color: #D9D9D9;" id="right-player"></div>
              <div class="text-6xl font-bold leading-none" style="color: #D9D9D9;" id="right-score">0</div>
            </div>
          </div>

          <!-- Game elements -->
          <div class="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#D9D9D9]" id="ball"></div>
          <div class="absolute left-[30px] w-3 h-20 rounded-md top-47/100 -translate-y-1/2 bg-[#D9D9D9]" id="left-paddle"></div>
		  <div class="absolute right-[30px] w-3 h-20 rounded-md top-47F/100 -translate-y-1/2 bg-[#D9D9D9]" id="right-paddle"></div>
        </div>
      </div>
      
      <!-- Pause Overlay (positioned over the game area but outside to avoid blur) -->
      <div id="pause-overlay" class="absolute top-0 left-0 right-[2vw] bottom-0 flex items-center justify-center hidden z-30">
        <div class="flex space-x-8">
          <!-- Pause Button (Left) -->
          <button id="pause-btn" class="group w-20 h-20 bg-[#191A1A] border border-[#fbd11b] rounded-lg flex items-center justify-center hover:bg-[#191A1A] hover:bg-opacity-0 hover:border hover:border-[#fbd11b] transition-colors">
            <div class="flex space-x-1">
              <div class="w-2 h-8 bg-[#fbd11b] rounded-sm group-hover:bg-[#fbd11b] transition-colors"></div>
              <div class="w-2 h-8 bg-[#fbd11b] rounded-sm group-hover:bg-[#fbd11b] transition-colors"></div>
            </div>
          </button>
          
          <!-- Play Button (Right) -->
          <button id="play-btn" class="group w-20 h-20 bg-[#fbd11b] rounded-lg flex items-center justify-center hover:bg-[#191A1A] hover:bg-opacity-0 hover:border hover:border-[#fbd11b] transition-colors">
            <div class="w-0 h-0 border-l-[18px] border-[#191A1A] group-hover:border-l-[#fbd11b] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1 transition-colors"></div>
          </button>
        </div>
      </div>
    </div>
    </div>
    <div class="h-[2vh]" style="background-color: #fbd11b;"></div>
  </div>
        `;
    }

    winnerRender(): string {
      return `            
      <!-- Pantalla de Ganador del Torneo -->
      <div id="winner-screen" class="text-center hidden flex items-center flex-col">
          <svg width="122" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_176_1235" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="122" height="122">
            <rect width="122" height="122" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_176_1235)">
            <path d="M27.8017 99.1249V93.3566H94.1977V99.1249H27.8017ZM27.5768 82.5355L20.4499 41.5079C20.0915 41.6443 19.7463 41.7256 19.4142 41.7519C19.0821 41.7781 18.7368 41.7913 18.3785 41.7913C16.7942 41.7913 15.453 41.244 14.355 40.1494C13.257 39.0556 12.708 37.7127 12.708 36.1208C12.708 34.5348 13.257 33.164 14.355 32.0084C15.453 30.8528 16.795 30.275 18.381 30.275C19.9662 30.275 21.3361 30.8528 22.4909 32.0084C23.6465 33.164 24.2243 34.5348 24.2243 36.1208C24.2243 36.6783 24.151 37.2201 24.0044 37.7462C23.857 38.2723 23.6207 38.7409 23.2953 39.1518L41.5165 46.9038L58.5063 23.6184C57.4837 23.1753 56.6691 22.4932 56.0625 21.5723C55.4567 20.6522 55.1538 19.6203 55.1538 18.4766C55.1538 16.8897 55.7312 15.5316 56.886 14.4023C58.0408 13.2729 59.4111 12.7083 60.9971 12.7083C62.5823 12.7083 63.9535 13.2721 65.1108 14.3997C66.2673 15.5274 66.8455 16.8829 66.8455 18.4664C66.8455 19.633 66.5426 20.6726 65.9369 21.585C65.3302 22.4975 64.5317 23.1753 63.5413 23.6184L80.4828 46.9038L98.704 39.1518C98.4177 38.7527 98.1915 38.2846 98.0254 37.7475C97.8585 37.2103 97.7751 36.6681 97.7751 36.1208C97.7751 34.5348 98.3291 33.164 99.4373 32.0084C100.545 30.8528 101.882 30.275 103.448 30.275C105.034 30.275 106.404 30.8528 107.559 32.0084C108.714 33.164 109.291 34.5348 109.291 36.1208C109.291 37.7077 108.713 39.0492 107.555 40.1455C106.398 41.2427 105.025 41.7913 103.435 41.7913C103.097 41.7913 102.78 41.757 102.483 41.6883C102.186 41.6197 101.869 41.5333 101.533 41.4291L94.4226 82.5355H27.5768ZM32.4936 76.7684H89.554L94.8432 47.2063L78.527 54.1374L60.9997 29.942L43.4723 54.1374L27.1561 47.2063L32.4936 76.7684Z" fill="#fbd11b"/>
            </g>
          </svg>
          <p id="winner-name" class="text-6xl font-bold text-yellow-400 mt-2"></p>
          <button id="showResumBtn" class="mt-8 px-6 py-2 border border-yellow-400 text-yellow-400 font-bold rounded hover:bg-yellow-400 hover:text-black transition-colors">
              continue
          </button>
      </div>
      `
    }
    renderGame(): string {
      return `
        <main id="gamesArea" class="hidden flex-1 bg-black d-flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full">
        
          <div id="winner-screen" class="text-center hidden flex items-center flex-col">
              <svg width="122" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_176_1235" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="122" height="122">
                <rect width="122" height="122" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_176_1235)">
                <path d="M27.8017 99.1249V93.3566H94.1977V99.1249H27.8017ZM27.5768 82.5355L20.4499 41.5079C20.0915 41.6443 19.7463 41.7256 19.4142 41.7519C19.0821 41.7781 18.7368 41.7913 18.3785 41.7913C16.7942 41.7913 15.453 41.244 14.355 40.1494C13.257 39.0556 12.708 37.7127 12.708 36.1208C12.708 34.5348 13.257 33.164 14.355 32.0084C15.453 30.8528 16.795 30.275 18.381 30.275C19.9662 30.275 21.3361 30.8528 22.4909 32.0084C23.6465 33.164 24.2243 34.5348 24.2243 36.1208C24.2243 36.6783 24.151 37.2201 24.0044 37.7462C23.857 38.2723 23.6207 38.7409 23.2953 39.1518L41.5165 46.9038L58.5063 23.6184C57.4837 23.1753 56.6691 22.4932 56.0625 21.5723C55.4567 20.6522 55.1538 19.6203 55.1538 18.4766C55.1538 16.8897 55.7312 15.5316 56.886 14.4023C58.0408 13.2729 59.4111 12.7083 60.9971 12.7083C62.5823 12.7083 63.9535 13.2721 65.1108 14.3997C66.2673 15.5274 66.8455 16.8829 66.8455 18.4664C66.8455 19.633 66.5426 20.6726 65.9369 21.585C65.3302 22.4975 64.5317 23.1753 63.5413 23.6184L80.4828 46.9038L98.704 39.1518C98.4177 38.7527 98.1915 38.2846 98.0254 37.7475C97.8585 37.2103 97.7751 36.6681 97.7751 36.1208C97.7751 34.5348 98.3291 33.164 99.4373 32.0084C100.545 30.8528 101.882 30.275 103.448 30.275C105.034 30.275 106.404 30.8528 107.559 32.0084C108.714 33.164 109.291 34.5348 109.291 36.1208C109.291 37.7077 108.713 39.0492 107.555 40.1455C106.398 41.2427 105.025 41.7913 103.435 41.7913C103.097 41.7913 102.78 41.757 102.483 41.6883C102.186 41.6197 101.869 41.5333 101.533 41.4291L94.4226 82.5355H27.5768ZM32.4936 76.7684H89.554L94.8432 47.2063L78.527 54.1374L60.9997 29.942L43.4723 54.1374L27.1561 47.2063L32.4936 76.7684Z" fill="#fbd11b"/>
                </g>
              </svg>
              <p id="winner-name" class="text-6xl font-bold text-yellow-400 mt-2"></p>
          </div>
        </main>
      `
    }
}
