import { TournamentPlay } from "./sidebar/playBtn/playSidebarBehavior";

// function swapLineToRightSvg(): string {
//   return `
//     <svg width="206" height="147" viewBox="0 0 206 147" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M2.00244 143.698C1.17401 143.698 0.502441 144.37 0.502441 145.198C0.502441 146.027 1.17401 146.698 2.00244 146.698V145.198V143.698ZM205.06 12.9925C205.646 12.4068 205.646 11.457 205.06 10.8712L195.515 1.32528C194.929 0.739496 193.979 0.739496 193.393 1.32528C192.807 1.91107 192.807 2.86082 193.393 3.4466L201.878 11.9319L193.393 20.4172C192.807 21.003 192.807 21.9527 193.393 22.5385C193.979 23.1243 194.929 23.1243 195.515 22.5385L205.06 12.9925ZM2.00244 145.198V146.698H81.0011V145.198V143.698H2.00244V145.198ZM105.001 121.198H106.501V35.9319H105.001H103.501V121.198H105.001ZM129.001 11.9319V13.4319H204V11.9319V10.4319H129.001V11.9319ZM105.001 35.9319H106.501C106.501 23.5055 116.575 13.4319 129.001 13.4319V11.9319V10.4319C114.918 10.4319 103.501 21.8486 103.501 35.9319H105.001ZM81.0011 145.198V146.698C95.0844 146.698 106.501 135.281 106.501 121.198H105.001H103.501C103.501 133.625 93.4275 143.698 81.0011 143.698V145.198Z" fill="#D9D9D9" fill-opacity="0.5"/>
//     </svg>
// 	`
// }

// function swapLineToLeftSvg(): string {
//   return `
//     <svg width="203" height="147" viewBox="0 0 203 147" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M200.653 3.38904C201.482 3.38904 202.153 2.71747 202.153 1.88904C202.153 1.06061 201.482 0.389038 200.653 0.389038V1.88904V3.38904ZM1.20204 134.871C0.616249 135.457 0.616249 136.407 1.20204 136.993L10.748 146.538C11.3338 147.124 12.2835 147.124 12.8693 146.538C13.4551 145.953 13.4551 145.003 12.8693 144.417L4.38402 135.932L12.8693 127.447C13.4551 126.861 13.4551 125.911 12.8693 125.325C12.2835 124.74 11.3338 124.74 10.748 125.325L1.20204 134.871ZM200.653 1.88904V0.389038H123.458V1.88904V3.38904H200.653V1.88904ZM99.4581 25.889H97.9581V111.932H99.4581H100.958V25.889H99.4581ZM75.4581 135.932V134.432H2.2627V135.932V137.432H75.4581V135.932ZM99.4581 111.932H97.9581C97.9581 124.358 87.8845 134.432 75.4581 134.432V135.932V137.432C89.5413 137.432 100.958 126.015 100.958 111.932H99.4581ZM123.458 1.88904V0.389038C109.375 0.389038 97.9581 11.8058 97.9581 25.889H99.4581H100.958C100.958 13.4626 111.032 3.38904 123.458 3.38904V1.88904Z" fill="#D9D9D9" fill-opacity="0.5"/>
//     </svg>
//   `
// }

export const TournamentArea = {
  render(): string {
    return `
      <main id="tournamentArea" class="hidden flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
		<div id="tournamentAreaPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>
		<!-- 
  CONTENEDOR PRINCIPAL (EL LIENZO)
  - 'relative': Fundamental. Actúa como el área de referencia para todos los elementos 'absolute' que contiene.
  - 'min-h-screen': Asegura que el lienzo ocupe al menos toda la altura de la pantalla, dando espacio para el posicionamiento.
  - 'overflow-hidden': Evita barras de scroll si algún elemento se desborda ligeramente.
-->
<div class="relative w-full min-h-screen bg-[#1a1a1a] text-white p-4 md:p-8 overflow-hidden">

    <!-- TÍTULO: Anclado en la esquina superior izquierda -->
    <div class="absolute top-4 left-4 md:top-8 md:left-8 z-10">
        <h1 class="text-4xl md:text-5xl font-bold tracking-wider text-yellow-400/90">
            Tournament
        </h1>
    </div>

    <!-- SEMIFINAL 1: Anclada en la esquina inferior izquierda -->
    <div class="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10">
        <p class="mb-2 text-sm text-white/60">Semifinal 1</p>
        <div class="space-y-3">
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input type="text" placeholder="erigonza" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span class="pl-2 text-white/80">0</span>
            </div>
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input type="text" placeholder="jose" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span class="pl-2 text-white/80">0</span>
            </div>
        </div>
    </div>

    <!-- SEMIFINAL 2: Anclada en la esquina superior derecha -->
    <div class="absolute top-4 right-4 md:top-8 md:right-8 z-10 flex flex-col items-end">
        <p class="mb-2 text-sm text-white/60">Semifinal 2</p>
        <div class="space-y-3">
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input type="text" placeholder="moha" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span class="pl-2 text-white/80">0</span>
            </div>
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input type="text" placeholder="simon" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span class="pl-2 text-white/80">0</span>
            </div>
        </div>
    </div>

    <!-- 
      BLOQUE CENTRAL (FINAL Y FLECHAS)
      - Contenedor anclado al centro exacto de la pantalla.
      - 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' es la fórmula para un centrado perfecto.
      - 'relative' para que las flechas se posicionen respecto a él.
    -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0">
    
        <!-- FLECHA IZQUIERDA: Conecta visualmente la esquina inferior-izquierda con el centro -->
        <div class="absolute right-full bottom-0">
             <svg width="206" height="147" viewBox="0 0 206 147" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.00244 143.698C1.17401 143.698 0.502441 144.37 0.502441 145.198C0.502441 146.027 1.17401 146.698 2.00244 146.698V145.198V143.698ZM205.06 12.9925C205.646 12.4068 205.646 11.457 205.06 10.8712L195.515 1.32528C194.929 0.739496 193.979 0.739496 193.393 1.32528C192.807 1.91107 192.807 2.86082 193.393 3.4466L201.878 11.9319L193.393 20.4172C192.807 21.003 192.807 21.9527 193.393 22.5385C193.979 23.1243 194.929 23.1243 195.515 22.5385L205.06 12.9925ZM2.00244 145.198V146.698H81.0011V145.198V143.698H2.00244V145.198ZM105.001 121.198H106.501V35.9319H105.001H103.501V121.198H105.001ZM129.001 11.9319V13.4319H204V11.9319V10.4319H129.001V11.9319ZM105.001 35.9319H106.501C106.501 23.5055 116.575 13.4319 129.001 13.4319V11.9319V10.4319C114.918 10.4319 103.501 21.8486 103.501 35.9319H105.001ZM81.0011 145.198V146.698C95.0844 146.698 106.501 135.281 106.501 121.198H105.001H103.501C103.501 133.625 93.4275 143.698 81.0011 143.698V145.198Z" fill="#D9D9D9" fill-opacity="0.5"/>
            </svg>
        </div>
        
        <!-- EL BLOQUE DE LA FINAL (Z-10 para que esté sobre las flechas) -->
        <div class="relative z-10">
            <p class="mb-2 text-sm text-white/60 text-center">Final</p>
            <div class="space-y-3">
                <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                    <span class="text-white/70">---</span>
                    <span class="pl-2 text-white/80">0</span>
                </div>
                <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                    <span class="text-white/70">---</span>
                    <span class="pl-2 text-white/80">0</span>
                </div>
            </div>
        </div>

        <!-- FLECHA DERECHA: Conecta visualmente la esquina superior-derecha con el centro -->
        <div class="absolute left-full top-0 -translate-y-full">
            <svg width="203" height="147" viewBox="0 0 203 147" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M200.653 3.38904C201.482 3.38904 202.153 2.71747 202.153 1.88904C202.153 1.06061 201.482 0.389038 200.653 0.389038V1.88904V3.38904ZM1.20204 134.871C0.616249 135.457 0.616249 136.407 1.20204 136.993L10.748 146.538C11.3338 147.124 12.2835 147.124 12.8693 146.538C13.4551 145.953 13.4551 145.003 12.8693 144.417L4.38402 135.932L12.8693 127.447C13.4551 126.861 13.4551 125.911 12.8693 125.325C12.2835 124.74 11.3338 124.74 10.748 125.325L1.20204 134.871ZM200.653 1.88904V0.389038H123.458V1.88904V3.38904H200.653V1.88904ZM99.4581 25.889H97.9581V111.932H99.4581H100.958V25.889H99.4581ZM75.4581 135.932V134.432H2.2627V135.932V137.432H75.4581V135.932ZM99.4581 111.932H97.9581C97.9581 124.358 87.8845 134.432 75.4581 134.432V135.932V137.432C89.5413 137.432 100.958 126.015 100.958 111.932H99.4581ZM123.458 1.88904V0.389038C109.375 0.389038 97.9581 11.8058 97.9581 25.889H99.4581H100.958C100.958 13.4626 111.032 3.38904 123.458 3.38904V1.88904Z" fill="#D9D9D9" fill-opacity="0.5"/>
            </svg>
        </div>

    </div>

</div>
</body>
</html>
	 </main>
      `
  },

  init(): void {
    TournamentPlay();
  }
};