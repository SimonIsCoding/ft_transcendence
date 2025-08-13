import type { TournamentModel } from "../models/TournamentModel";
import { currentTournament } from "../models/TournamentStore";

class UIManager {

    /**
     * Muestra la pantalla "Player X vs Player Y" y devuelve una Promesa
     * que se resuelve cuando el usuario pulsa el botón "START MATCH".
     */
    public showPreGame(player1: string, player2: string): Promise<void> {
        return new Promise(resolve => {
            const overlay = document.getElementById('game-overlay');
            const preGameScreen = document.getElementById('pre-game-screen');
            const playerVsPlayerText = document.getElementById('player-vs-player');
            const countdownText = document.getElementById('countdown-text');

            // const startMatchButton = document.getElementById('start-match-button');
            // quitamos el Go de aqui, porque solo tiene que mostrar jugador vs jugador
            countdownText!.textContent = '';
            playerVsPlayerText!.textContent = `${player1} vs ${player2}`;

            preGameScreen?.classList.remove('hidden');
            // countdownScreen?.classList.add('hidden');
            // winnerScreen?.classList.add('hidden');
            overlay?.classList.remove('hidden');
            overlay?.classList.add('flex');

            setTimeout(() => {
                // Ocultamos la pantalla "vs" para dar paso a la cuenta atrás
                preGameScreen?.classList.add('hidden');
                resolve();
            }, 3000);
        });
    }

    /**
     * Muestra la cuenta atrás 3, 2, 1, GO! y devuelve una Promesa
     * que se resuelve cuando la cuenta atrás termina.
     */
    public startCountdown(): Promise<void> {
        return new Promise(resolve => {

            const overlay = document.getElementById('game-overlay');
            const preGameScreen = document.getElementById('pre-game-screen');
            const countdownScreen = document.getElementById('countdown-screen');
            const countdownText = document.getElementById('countdown-text');
            // const tournamentArea = document.getElementById('tournamentArea');
            // tournamentArea?.classList.add('hidden');
            preGameScreen?.classList.add('hidden');
            countdownScreen?.classList.remove('hidden');

            let count = 3;
            countdownText!.textContent = String(count);

            const interval = setInterval(() => {
                count--;
                if (count > 0) {
                    countdownText!.textContent = String(count);
                } else if (count === 0) {
                    countdownText!.textContent = 'GO!';
                } else {
                    clearInterval(interval);
                    overlay?.classList.add('hidden');
                    overlay?.classList.remove('flex');
                    resolve(); // La cuenta atrás ha terminado
                }
            }, 1000);
        });
    }

    /**
     * Actualiza todo el bracket (nombres, scores y ganadores)
     * basándose en el estado actual del modelo del torneo.
     */
    public updateBracket(tournament: TournamentModel) {
        // Actualiza Semifinal 1
        console.log('en la funcion updateBracket')

        if (tournament.semifinal1) {

            const match = tournament.semifinal1;
            const p1_input = document.querySelector('#alias1') as HTMLInputElement;
            const p1_points = document.querySelector('#alias1-point') as HTMLInputElement;
            const p2_input = document.querySelector('#alias2') as HTMLInputElement;
            const p2_points = document.querySelector('#alias2-point') as HTMLInputElement;

            p1_input.value = match.player1.alias;
            p2_input.value = match.player2.alias;

            // Limpiamos resaltados anteriores
            // p1_input.closest('.flex')?.classList.remove('winner-bg');
            // p2_input.closest('.flex')?.classList.remove('winner-bg');
            p1_points.textContent = match.player1.score?.toString() ?? '0';
            p2_points.textContent = match.player2.score?.toString() ?? '0';

            if (match.winner) {
                const winnerSlot = document.querySelector('#final1'); // Alias en la final
                if (winnerSlot) winnerSlot.textContent = match.winner.alias;

                // const winnerPoint = document.querySelector('#final1-point');
                // if (winnerPoint) winnerPoint.textContent = match.winner.score?.toString() ?? '0';

                if (match.winner.alias === match.player1.alias) {
                    p1_input.closest('.flex')?.classList.add('winner-bg');
                } else {
                    p2_input.closest('.flex')?.classList.add('winner-bg');
                }
            }
        }
        if (tournament.semifinal2) {
            const match = tournament.semifinal2;

            const p1_input = document.querySelector('#alias3') as HTMLInputElement;
            const p2_input = document.querySelector('#alias4') as HTMLInputElement;
            const p1_points = document.querySelector('#alias3-point') as HTMLElement;
            const p2_points = document.querySelector('#alias4-point') as HTMLElement;

            p1_input.value = match.player1.alias;
            p2_input.value = match.player2.alias;

            p1_points.textContent = match.player1.score?.toString() ?? '0';
            p2_points.textContent = match.player2.score?.toString() ?? '0';

            p1_input.closest('.flex')?.classList.remove('winner-bg');
            p2_input.closest('.flex')?.classList.remove('winner-bg');

            if (match.winner) {
                const finalist2Slot = document.querySelector('#final2');
                if (finalist2Slot) finalist2Slot.textContent = match.winner.alias;

                const finalist2Point = document.querySelector('#final2-point');
                if (finalist2Point) finalist2Point.textContent = match.winner.score?.toString() ?? '0';

                if (match.winner.alias === match.player1.alias) {
                    p1_input.closest('.flex')?.classList.add('winner-bg');
                } else {
                    p2_input.closest('.flex')?.classList.add('winner-bg');
                }
            }
        }

        // --- FINAL ---
        if (tournament.finalMatch) {
            const match = tournament.finalMatch;

            const f1_input = document.querySelector('#final1') as HTMLElement;
            const f2_input = document.querySelector('#final2') as HTMLElement;

            const f1_point = document.querySelector('#final1-point') as HTMLElement;
            const f2_point = document.querySelector('#final2-point') as HTMLElement;

            f1_input.textContent = match.player1.alias;
            f2_input.textContent = match.player2.alias;

            f1_point.textContent = match.player1.score?.toString() ?? '0';
            f2_point.textContent = match.player2.score?.toString() ?? '0';

            f1_input.closest('.flex')?.classList.remove('winner-bg');
            f2_input.closest('.flex')?.classList.remove('winner-bg');

            if (match.winner) {
                if (match.winner.alias === match.player1.alias) {
                    f1_input.closest('.flex')?.classList.add('winner-bg');
                } else {
                    f2_input.closest('.flex')?.classList.add('winner-bg');
                }
            }
        }

        // --- Cargar alias1 desde localStorage (login) esto ponerlo al cargar render---
        const storedLogin = localStorage.getItem('login');
        if (storedLogin) {
            try {
                const parsed = JSON.parse(storedLogin);
                if (parsed.alias1) {
                    const alias1Input = document.querySelector('#alias1') as HTMLInputElement;
                    if (alias1Input && alias1Input.value !== parsed.alias1) {
                        alias1Input.value = parsed.alias1;
                    }
                }
            } catch (e) {
                console.warn('❌ Error al parsear login:', e);
            }
        }
    }

    public mostrarResumenPostPartido(onNextClickCallback: () => void): void {
        // Referencias a los elementos del DOM que vamos a manipular
        const tournamentArea = document.getElementById('tournamentArea');
        const gameContainer = document.getElementById('gameCanvasContainer'); // El contenedor del juego
        const gameOverlay = document.getElementById('game-overlay');
        const nextBtn = document.getElementById('nextMatchBtn');

        // 1. Ocultamos todo lo relacionado con el juego
        gameContainer?.classList.add('hidden');
        gameOverlay?.classList.add('hidden');
        gameOverlay?.classList.remove('flex');

        // 2. Mostramos la vista del torneo
        tournamentArea?.classList.remove('hidden');

        // 3. Actualizamos el bracket con la puntuación y el ganador que se acaban de registrar
        // (Asumimos que el modelo ya ha sido actualizado por el controlador)
        this.updateBracket(currentTournament!);

        // 4. Mostramos el botón "Siguiente"
        if (nextBtn) {
            nextBtn.classList.remove('hidden');

            // 5. Asignamos la acción al botón de forma segura para evitar listeners duplicados
            // Clonar y reemplazar es la técnica más robusta.
            const newNextBtn = nextBtn.cloneNode(true);
            nextBtn?.parentNode?.replaceChild(newNextBtn, nextBtn);

            newNextBtn.addEventListener('click', () => {
                // Cuando se hace clic, primero ocultamos el botón
                (newNextBtn as HTMLElement).classList.add('hidden');
                // Y luego ejecutamos la acción que nos pasó el controlador
                onNextClickCallback();
            });
        }
    }



    /**
     * Muestra la pantalla final con el ganador del torneo.
     */
    public showTournamentWinner(winnerAlias: string) {
        const overlay = document.getElementById('game-overlay');
        const winnerScreen = document.getElementById('winner-screen');
        const tournamentWinnerName = document.getElementById('winner-name');

        tournamentWinnerName!.textContent = winnerAlias;
        // preGameScreen?.classList.add('hidden');
        // countdownScreen?.classList.add('hidden');
        winnerScreen?.classList.remove('hidden');
        overlay?.classList.remove('hidden');
        overlay?.classList.add('flex');

        // Aquí puedes añadir el listener para el botón de reiniciar
        document.getElementById('restart-tournament-button')!.onclick = () => {
            // Lógica para reiniciar, por ejemplo, navegar a la página de inicio
            window.location.reload(); // O usar tu Router
        };
    }

}

// Exportamos una única instancia para que toda la app use la misma.
export const TournamentUIManager = new UIManager();