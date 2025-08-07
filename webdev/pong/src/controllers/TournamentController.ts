import type { Match } from '../models/TournamentModel';
import { GameView } from '../views/game';

export class TournamentController {
    private model;

    constructor(model: any) {
        this.model = model;
    }

    iniciarTorneo() {
        this.model.players = [];

        for (let i = 1; i <= 4; i++) {
            let alias = '';
            while (!alias) {
                alias = prompt(`Introduce el alias del jugador ${i}:`)?.trim() || '';
            }
            this.model.addPlayer(alias);
        }

        debugger
        this.model.generateFirstMatch();
        // esta parte hay que revisarla porque no va ha la siguiente semifinal y 
        // tampoco te dice quien ha ganado del todo bien y a veces va ha la final 
        // antes de hacer la segunda semifinal o directamente te dice x ha ganado el torneo
        this.jugarPartido(this.model.semifinal1!, () => {
            alert(`${this.model.semifinal1.winner.alias} ha ganado esta partida`);
            this.model.generateSecondMatch();
            // console.log(this.model.semifinal2)
            this.jugarPartido(this.model.semifinal2!, () => {
                // alert(`${this.model.semifinal2.winner.alias} ha ganado esta partida`);
                // console.log(this.model.semifinal2)
                if (this.model.semifinal1!.winner && this.model.semifinal2!.winner) {
                    this.model.generateFinal();
                    // hay que cambiar esta parte porque al no haber jugado la final
                    // va la final en vez de hacer la otra semifinal
                    // console.log('final: ' + this.model.finalMatch)
                    this.jugarPartido(this.model.finalMatch!, () => {
                        // console.log('final: ' + this.model.finalMatch)
                        const ganador = this.model.finalMatch!.winner!;
                          alert(`🏆 Ganador del torneo: ${ganador.alias}`);
                        this.model.setWinner(ganador);
                        this.model.saveToLocalStorage();
                        
                    });
                }
            });
        });
    }
    // puede ser que esta funcion este mal, por que cuando solo es una semifinal funciona bien
    private jugarPartido(match: Match, callback: () => void) {
        // console.log('jugando partido', match);
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
                // console.log('ganador', winner);
                // debugger
                callback();
                // console.log('Partido terminado', match);
            }
        );
    }
}
