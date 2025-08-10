import type { Match } from '../models/TournamentModel';
import { Router } from '../router';
import { GameView } from '../views/game';
import { currentTournament } from '../models/TournamentStore';

export class TournamentController {

    iniciarTorneo() {
        if (currentTournament?.isReady()) {
            currentTournament?.generateMatches();
            this.jugarPartido(currentTournament?.semifinal1!, () => {
                alert(`${currentTournament?.semifinal1?.winner?.alias} ha ganado esta partida`);
                this.jugarPartido(currentTournament?.semifinal2!, () => {
                    alert(`${currentTournament?.semifinal2?.winner?.alias} ha ganado esta partida`);
                    if (currentTournament?.semifinal1!.winner && currentTournament?.semifinal2!.winner) {
                        currentTournament?.generateFinal();
                        this.jugarPartido(currentTournament?.finalMatch!, () => {
                            const ganador = currentTournament?.finalMatch!.winner!;
                            alert(`🏆 Ganador del torneo: ${ganador.alias}`);
                            currentTournament?.setWinner(ganador);
                            currentTournament?.saveToLocalStorage();
                            // enviar al home temporalmente !!!
                            Router.navigate('home')
                        });
                    }
                });
            });
        }
    }
    private jugarPartido(match: Match, callback: () => void) {
        GameView.setPlayersAndCallback(
            match.player1.alias,
            match.player2.alias,
            (winnerAlias: string) => {
                const winner = [match.player1, match.player2].find(p => p.alias == winnerAlias);
                if (!winner) {
                    alert("Error: No se pudo determinar el ganador");
                    return;
                }
                match.winner = winner;
                callback();
            }
        );
    }
}
