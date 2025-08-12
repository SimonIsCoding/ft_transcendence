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

        document.getElementById('game-overlay');
        // alert(`${currentTournament.semifinal1?.winner?.alias} ha ganado esta partida`);

        // --- JUGAR SEMIFINAL 2 ---
        await this.jugarPartido(currentTournament.semifinal2!);
        TournamentUIManager.updateBracket(currentTournament); // Actualiza la UI con el ganador
        // alert(`${currentTournament.semifinal2?.winner?.alias} ha ganado esta partida`);
        
        // --- JUGAR LA FINAL ---
        if (currentTournament.semifinal1?.winner && currentTournament.semifinal2?.winner) {
            currentTournament.generateFinal();
            await this.jugarPartido(currentTournament.finalMatch!);
            
            const ganador = currentTournament.finalMatch!.winner!;
            currentTournament.setWinner(ganador);
            TournamentUIManager.updateBracket(currentTournament);

            TournamentUIManager.showTournamentWinner(ganador.alias);
            
            currentTournament.saveToLocalStorage();
        }
    }

    // private mostrarRender()
    // {
    //     return `<div>
    //         <h1>Salir render torneo con la puntuación de los jugadores</<h1>
    //     </div>`
    // }

    private jugarPartido(match: Match): Promise<void> {
        return new Promise(async (resolve) => {
            await TournamentUIManager.showPreGame(match.player1.alias, match.player2.alias);

            // 2. Mostrar cuenta atrás y esperar a que termine
            await TournamentUIManager.startCountdown();
            // debugger
            // 3. Iniciar el juego (tu lógica actual)

            setMatchInfo({
                player1: match.player1.alias,
                player2: match.player2.alias,
                partidoActivo: true, // ¡UNA NUEVA BANDERA!
                onMatchEnd: (winnerAlias: string) => {
                    // ... tu lógica de onMatchEnd para actualizar el modelo ...
                    match.winner = (match.player1.alias === winnerAlias) ? match.player1 : match.player2;
                    // ... etc ...
                    
                    // Al terminar, marcamos que el partido ya no está activo
                    if (matchInfo) 
                    {
                    setMatchInfo({ ...matchInfo, partidoActivo: false});
                    }
                    // Volvemos a la misma ruta de torneo para que muestre el bracket
                    Router.navigate('tournament');
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
