import type { Match } from '../models/TournamentModel';
import { Router } from '../router';
import { GameView } from '../views/game';
import { currentTournament } from '../models/TournamentStore';

export class TournamentController {
    private model;

    constructor(model: any) {
        this.model = model;
    }

    iniciarTorneo() {
        // this.model.players = [];

        // for (let i = 1; i <= 4; i++) {
        //     let alias = '';
        //     while (!alias) {
        //         alias = prompt(`Introduce el alias del jugador ${i}:`)?.trim() || '';
        //     }
        //     this.model.addPlayer(alias);
        // }
        if (currentTournament?.isReady())
        {
            this.model.generateMatches();
        }
        this.jugarPartido(this.model.semifinal1!, () => {
            alert(`${this.model.semifinal1.winner.alias} ha ganado esta partida`);
            this.jugarPartido(this.model.semifinal2!, () => {
                alert(`${this.model.semifinal2.winner.alias} ha ganado esta partida`);
                if (this.model.semifinal1!.winner && this.model.semifinal2!.winner) {
                    this.model.generateFinal();
                    this.jugarPartido(this.model.finalMatch!, () => {
                        const ganador = this.model.finalMatch!.winner!;
                          alert(`🏆 Ganador del torneo: ${ganador.alias}`);
                        this.model.setWinner(ganador);
                        this.model.saveToLocalStorage();
                        // enviar al home temporalmente
                        Router.navigate('home')
                    });
                }
            });
        });
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
