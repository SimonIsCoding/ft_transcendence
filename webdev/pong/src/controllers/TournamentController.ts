import type { Match } from '../models/TournamentModel';
import { Router } from '../router';
// import { GameView } from '../views/game';
import { currentTournament, setMatchInfo, matchInfo } from '../models/TournamentStore';
import { TournamentUIManager } from '../views/TournamentUIManager';

export class TournamentController {

    async iniciarTorneo() {
        // if (currentTournament?.isReady()) {
        if (!currentTournament?.isReady()) return;
        currentTournament?.generateMatches();
        await this.jugarPartido(currentTournament.semifinal1!);
        // this.mostrarRender();

        TournamentUIManager.updateBracket(currentTournament); // Actualiza la UI con el ganador
        this.mostrarVistaTorneo();
        await this.esperarClickDelUsuario();
        // this.mostrarVistaJuego();
        // document.getElementById('game-overlay');

        // alert(`${currentTournament.semifinal1?.winner?.alias} ha ganado esta partida`);

        // --- JUGAR SEMIFINAL 2 ---
        await this.jugarPartido(currentTournament.semifinal2!);
        TournamentUIManager.updateBracket(currentTournament); // Actualiza la UI con el ganador
        // alert(`${currentTournament.semifinal2?.winner?.alias} ha ganado esta partida`);
        this.mostrarVistaTorneo();
        await this.esperarClickDelUsuario();
        // this.mostrarVistaJuego();
        // --- JUGAR LA FINAL ---
        if (currentTournament.semifinal1?.winner && currentTournament.semifinal2?.winner) {
            currentTournament.generateFinal();
            await this.jugarPartido(currentTournament.finalMatch!);

            const ganador = currentTournament.finalMatch!.winner!;
            currentTournament.setWinner(ganador);
            TournamentUIManager.updateBracket(currentTournament);
            this.mostrarVistaTorneo();
            await this.esperarClickDelUsuario();
            TournamentUIManager.showTournamentWinner(ganador.alias);

            currentTournament.saveToLocalStorage();
        }
    }

    private async esperarClickDelUsuario(): Promise<void> {
        return new Promise(resolve => {
            const btn = document.getElementById('nextMatchBtn');

            if (!btn) {
                console.warn('Botón "Siguiente" no encontrado.');
                resolve(); // Evitamos que se quede colgado si no existe
                return;
            }

            const handler = () => {
                btn.removeEventListener('click', handler);
                resolve();
            };

            btn.addEventListener('click', handler);
        });
    }

    private mostrarVistaTorneo() {
        const tournamentArea = document.getElementById('tournamentArea');
        const gameArea = document.getElementById('gameCanvasContainer');

        if (tournamentArea) tournamentArea.style.display = 'block';
        if (gameArea) gameArea.style.display = 'none';
    }

    private mostrarVistaJuego()
    {
        const tournamentArea = document.getElementById('tournamentArea');
        const gameArea = document.getElementById('gameCanvasContainer');

        if (tournamentArea) tournamentArea.style.display = 'none';
        if (gameArea) gameArea.style.display = 'block';
    }

    private jugarPartido(match: Match): Promise<void> {
        return new Promise(async (resolve) => {
            
            await TournamentUIManager.showPreGame(match.player1.alias, match.player2.alias);

            // 2. Mostrar cuenta atrás y esperar a que termine
            await TournamentUIManager.startCountdown();
            // debugger
            this.mostrarVistaJuego();
            // 3. Iniciar el juego (tu lógica actual)

            setMatchInfo({
                player1: match.player1.alias,
                player2: match.player2.alias,
                partidoActivo: true, // ¡UNA NUEVA BANDERA!
                onMatchEnd: (winnerAlias: string,  player1Score: number, player2Score: number) => {
                    // ... tu lógica de onMatchEnd para actualizar el modelo ...
                    match.player1.score = player1Score;
                    match.player2.score = player2Score;
                    match.winner = (match.player1.alias === winnerAlias) ? match.player1 : match.player2;
                    // ... etc ...

                    // Al terminar, marcamos que el partido ya no está activo
                    if (matchInfo) {
                        setMatchInfo({ ...matchInfo, partidoActivo: false });
                    }
                    // Volvemos a la misma ruta de torneo para que muestre el bracket
                    // Router.navigate('tournament'); // solventa la llamada dos veces a updatebracket 
                    resolve();
                }
            });
            // GameView.setPlayersAndCallback(
            //     match.player1.alias,
            //     match.player2.alias,
            //     (winnerAlias: string) => {
            //         const winner = [match.player1, match.player2].find(p => p.alias === winnerAlias);
            //         if (!winner) {
            //             alert("Error: No se pudo determinar el ganador");
            //             return; // O rechazar la promesa
            //         }
            //         match.winner = winner;
            //         resolve(); // El partido ha terminado, resolvemos la promesa
            //     }
            // );
            Router.navigate('tournament');
        });
    }
}
