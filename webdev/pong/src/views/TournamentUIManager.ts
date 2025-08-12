import type { TournamentModel } from "../models/TournamentModel";

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
            // const startMatchButton = document.getElementById('start-match-button');

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
            const p1_input = document.querySelector('#alias1') as HTMLInputElement;
            const p2_input = document.querySelector('#alias2') as HTMLInputElement;

            p1_input.value = tournament.semifinal1.player1.alias;
            p2_input.value = tournament.semifinal1.player2.alias;

            // Limpiamos resaltados anteriores
            p1_input.closest('.flex')?.classList.remove('winner-bg');
            p2_input.closest('.flex')?.classList.remove('winner-bg');

            if (tournament.semifinal1.winner) {
                // Resaltamos al ganador
                if (tournament.semifinal1.winner.alias === tournament.semifinal1.player1.alias) {
                    p1_input.closest('.flex')?.classList.add('winner-bg');
                } else {
                    p2_input.closest('.flex')?.classList.add('winner-bg');
                }

                // Actualizamos el nombre en la final
                const finalist1_slot = document.querySelector('#finalist1'); // Necesitarás añadir este ID en tu HTML de la final
                if (finalist1_slot) finalist1_slot.textContent = tournament.semifinal1.winner.alias;
            }
        }
        // Actualiza Semifinal 2 y Final de manera similar...
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

    public mostrarRender()
    {
        console.log('entra antes del updateBracket')
        return `
            <div>
                <h1>Salir render torneo con la puntuación de los jugadores</<h1>
            </div>
        `
    }
}

// Exportamos una única instancia para que toda la app use la misma.
export const TournamentUIManager = new UIManager();