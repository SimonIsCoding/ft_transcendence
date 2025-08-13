import { TournamentModel } from '../models/TournamentModel';
import { setTournament } from '../models/TournamentStore';
import { TournamentController } from '../controllers/TournamentController';

function swapLineToRightSvg(): string {
    return `
    <svg width="206" height="147" viewBox="0 0 206 147" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.00244 143.698C1.17401 143.698 0.502441 144.37 0.502441 145.198C0.502441 146.027 1.17401 146.698 2.00244 146.698V145.198V143.698ZM205.06 12.9925C205.646 12.4068 205.646 11.457 205.06 10.8712L195.515 1.32528C194.929 0.739496 193.979 0.739496 193.393 1.32528C192.807 1.91107 192.807 2.86082 193.393 3.4466L201.878 11.9319L193.393 20.4172C192.807 21.003 192.807 21.9527 193.393 22.5385C193.979 23.1243 194.929 23.1243 195.515 22.5385L205.06 12.9925ZM2.00244 145.198V146.698H81.0011V145.198V143.698H2.00244V145.198ZM105.001 121.198H106.501V35.9319H105.001H103.501V121.198H105.001ZM129.001 11.9319V13.4319H204V11.9319V10.4319H129.001V11.9319ZM105.001 35.9319H106.501C106.501 23.5055 116.575 13.4319 129.001 13.4319V11.9319V10.4319C114.918 10.4319 103.501 21.8486 103.501 35.9319H105.001ZM81.0011 145.198V146.698C95.0844 146.698 106.501 135.281 106.501 121.198H105.001H103.501C103.501 133.625 93.4275 143.698 81.0011 143.698V145.198Z" fill="#D9D9D9" fill-opacity="0.5"/>
    </svg>
	`
}

function swapLineToLeftSvg(): string {
    return `
    <svg width="203" height="147" viewBox="0 0 203 147" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M200.653 3.38904C201.482 3.38904 202.153 2.71747 202.153 1.88904C202.153 1.06061 201.482 0.389038 200.653 0.389038V1.88904V3.38904ZM1.20204 134.871C0.616249 135.457 0.616249 136.407 1.20204 136.993L10.748 146.538C11.3338 147.124 12.2835 147.124 12.8693 146.538C13.4551 145.953 13.4551 145.003 12.8693 144.417L4.38402 135.932L12.8693 127.447C13.4551 126.861 13.4551 125.911 12.8693 125.325C12.2835 124.74 11.3338 124.74 10.748 125.325L1.20204 134.871ZM200.653 1.88904V0.389038H123.458V1.88904V3.38904H200.653V1.88904ZM99.4581 25.889H97.9581V111.932H99.4581H100.958V25.889H99.4581ZM75.4581 135.932V134.432H2.2627V135.932V137.432H75.4581V135.932ZM99.4581 111.932H97.9581C97.9581 124.358 87.8845 134.432 75.4581 134.432V135.932V137.432C89.5413 137.432 100.958 126.015 100.958 111.932H99.4581ZM123.458 1.88904V0.389038C109.375 0.389038 97.9581 11.8058 97.9581 25.889H99.4581H100.958C100.958 13.4626 111.032 3.38904 123.458 3.38904V1.88904Z" fill="#D9D9D9" fill-opacity="0.5"/>
    </svg>
  `
}

export const TournamentArea = {
    render(): string {
        return `
      <main id="tournamentArea" class="hidden flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
		<div id="tournamentAreaPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>
		<div id="esquemaTorneo" class="relative w-full min-h-screen bg-[#1a1a1a] text-white p-4 md:p-8 overflow-hidden">

    <div class="absolute top-4 left-5 md:top-4 z-7 left-[21%]">
        <h1 class="text-4xl md:text-5xl font-bold tracking-wider text-yellow-400/90">
            Tournament
        </h1>
    </div>

    <div class="absolute bottom-4 left-2 z-10 left-[21%] top-[46.5%]">
        <p class="mb-2 text-sm text-white/60">Semifinal 1</p>
        <div class="space-y-3">
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input id="alias1" type="text" placeholder="login" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span id="alias1-point" class="pl-2 text-white/80">0</span>
            </div>
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input id="alias2" type="text" placeholder="user 2" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span id="alias2-point" class="pl-2 text-white/80">0</span>
            </div>
        </div>
    </div>

    <div class="absolute top-4 right-4 z-10 flex flex-col items-end top-[13.5%] right-[21%]">
        <p class="mb-2 text-sm text-white/60">Semifinal 2</p>
        <div class="space-y-3">
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input id="alias3" type="text" placeholder="user 3" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span id="alias3-point" class="pl-2 text-white/80">0</span>
            </div>
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input id="alias4" type="text" placeholder="user 4" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span id="alias4-point" class="pl-2 text-white/80">0</span>
            </div>
        </div>
    </div>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0 top-[47%]">
    
        <div class="relative bottom-0 right-[107%]">
             ${swapLineToRightSvg()}
        </div>
        
        <div class="absolute z-10 bottom-[76%]">
            <p class="mb-2 text-sm text-white/60 text-center">Final</p>
            <div class="space-y-3">
                <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                    <span id="final1" class="text-white/70">---</span>
                    <span id="final1-point" class="pl-2 text-white/80">0</span>
                </div>
                <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                    <span id="final2" class="text-white/70">---</span>
                    <span id="final2-point" class="pl-2 text-white/80">0</span>
                </div>
            </div>
        </div>

        <div class="absolute top-0 -translate-y-full top-[-18%] left-[107%]">
            ${swapLineToLeftSvg()}
        </div>
    </div>
    <div class="absolute top-[62%] left-[70.5%]">
		<button id="playtournamentBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl mt-10">Play</button>
		<button id="nextMatchBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl mt-10">Next</button>
    </div>
</div>
<div id="game-overlay" class="absolute inset-0 bg-black/80 flex-col items-center justify-center hidden z-50">
                    <!-- Pantalla Pre-Juego -->
                    <div id="pre-game-screen" class="text-center hidden">
                        <h2 id="player-vs-player" class="text-5xl md:text-7xl font-bold text-white animate-pulse"></h2>
                    </div>

                    <!-- Pantalla Cuenta Atrás -->
                    <div id="countdown-screen" class="text-center hidden">
                        <p id="countdown-text" class="text-9xl font-bold text-yellow-400"></p>
                    </div>

                    <!-- Pantalla de Ganador del Torneo -->
                    <div id="winner-screen" class="text-center hidden">
                        <!-- Tu SVG de la corona -->
                        <svg class="mx-auto w-24 h-24 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <!-- ... path del svg ... -->
                        </svg>
                        <h2 class="text-4xl mt-4">WINNER</h2>
                        <p id="winner-name" class="text-6xl font-bold text-yellow-400 mt-2"></p>
                        <button id="restart-tournament-button" class="mt-8 px-6 py-2 border border-yellow-400 text-yellow-400 font-bold rounded hover:bg-yellow-400 hover:text-black transition-colors">
                            REPETIR TORNEO
                        </button>
                    </div>
                </div>
	 </main>
      `
    },

    init(): void {
        console.log('entra')
        const playtournamentBtn = document.getElementById('playtournamentBtn') as HTMLButtonElement | null;

        // Es importante añadir el listener solo una vez.
        // Si `init` pudiera llamarse varias veces, habría que gestionar esto.
        // Por ahora, asumimos que se llama una sola vez por carga de vista.
        playtournamentBtn?.addEventListener('click', () => {
            const player1 = (document.getElementById("alias1") as HTMLInputElement).value;
            const player2 = (document.getElementById("alias2") as HTMLInputElement).value;
            const player3 = (document.getElementById("alias3") as HTMLInputElement).value;
            const player4 = (document.getElementById("alias4") as HTMLInputElement).value;

            if (!player1.trim() || !player2.trim() || !player3.trim() || !player4.trim()) {
                // showErrorPopup("You need 4 players to start a tournament.", "tournamentAreaPopup");
                alert("Necesitas 4 jugadores para empezar.");
                return;
            }

            const torneo = new TournamentModel();
            torneo.addPlayer(player1);
            torneo.addPlayer(player2);
            torneo.addPlayer(player3);
            torneo.addPlayer(player4);
            setTournament(torneo);

            // Ocultamos el botón para evitar múltiples inicios
            playtournamentBtn.classList.add('hidden');

            // Iniciamos el flujo del torneo
            const controller = new TournamentController();
            controller.iniciarTorneo();
        });
    }
};