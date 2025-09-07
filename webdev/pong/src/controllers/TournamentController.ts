import type { Match } from '../models/TournamentModel';
import { Router } from '../router';
import { currentTournament, getTournament, resetTournament } from '../models/TournamentStore';
import { TournamentUIManager } from '../views/TournamentUIManager';
import { Game } from '../pong-erik/Game';
import { enviarLogALogstash } from '../utils/logstash';
import { closeAllMenus } from '../views/sidebar/sidebarUtils';
import { ShowGame } from '../pong-erik/ShowGame';
import { sendGameService } from '../services/gameService';

export class TournamentController {
    async iniciarTorneo() {
        if (!currentTournament?.isReady()) return;
        currentTournament?.generateMatches();
        await this.jugarPartido(currentTournament.semifinal1!);
        TournamentUIManager.updateBracket(currentTournament.semifinal1!);
        this.mostrarVistaTorneo();
        enviarLogALogstash('Semifinal', {
            tournament_id: 'tourn-' + Date.now(),
            player1: currentTournament?.semifinal1?.player1.alias,
            player2: currentTournament?.semifinal1?.player2.alias,
            score1: currentTournament?.semifinal1?.player1.score,
            score2: currentTournament?.semifinal1?.player2.score
        });
        await this.esperarClickDelUsuario();
        await this.jugarPartido(currentTournament.semifinal2!);
        TournamentUIManager.updateBracket(currentTournament.semifinal2!);
        this.mostrarVistaTorneo();
        enviarLogALogstash('Semifinal', {
            tournament_id: 'tourn-' + Date.now(),
            player1: currentTournament?.semifinal2?.player1.alias,
            player2: currentTournament?.semifinal2?.player2.alias,
            score1: currentTournament?.semifinal2?.player1.score,
            score2: currentTournament?.semifinal2?.player2.score
        });
        await this.esperarClickDelUsuario();
        if (currentTournament.semifinal1?.winner && currentTournament.semifinal2?.winner) {
            currentTournament.generateFinal();
            
            await this.jugarPartido(currentTournament.finalMatch!);
            const ganador = currentTournament.finalMatch!.winner!;
            enviarLogALogstash('Final', {
                tournament_id: 'tourn-' + Date.now(),
                player1: currentTournament?.finalMatch?.player1,
                player2: currentTournament?.finalMatch?.player2,
                winner: ganador.alias,
                scores: ganador.score
            });
            currentTournament.setWinner(ganador);

            TournamentUIManager.updateBracket(currentTournament.finalMatch!);
            this.mostrarVistaTorneo();
            TournamentUIManager.showTournamentWinner(ganador.alias);
            resetTournament();
        }
    }

    private async esperarClickDelUsuario(): Promise<void> {
        let next = document.getElementById('nextMatchBtn')
        if (next)
            next.classList.remove('hidden');
        let play = document.getElementById('playtournamentBtn')
        if (play)
            play.classList.remove('inline-block');
        return new Promise(resolve => {
            const btn = document.getElementById('nextMatchBtn');
            if (!btn) {
                console.warn('Botón "Siguiente" no encontrado.');
                resolve();
                return;
            }
            const handler = () => {
				const submenus = document.querySelectorAll<HTMLElement>('.submenu');
				closeAllMenus(submenus);
                btn.removeEventListener('click', handler);
                resolve();
            };
            btn.addEventListener('click', handler);
        });
    }

    private mostrarVistaTorneo() {
        const tournamentArea = document.getElementById('esquemaTorneo');
        const gameArea = document.getElementById('gameCanvasContainer');
        if (tournamentArea) tournamentArea.style.display = 'block';
        if (gameArea) gameArea.style.display = 'none';
    }

    private mostrarVistaJuego() {
        const tournamentArea = document.getElementById('esquemaTorneo');
        const gameArea = document.getElementById('gameCanvasContainer');
        if (tournamentArea) tournamentArea.style.display = 'none';
        if (gameArea) gameArea.style.display = 'block';
    }

    private jugarPartido(match: Match): Promise<void> {
        return new Promise(async (resolve) => {
            // Prevent race conditions - only one game creation at a time
            if (ShowGame.isCreatingGame) {
                return;
            }
            ShowGame.isCreatingGame = true;
            try {
                // Stop any existing game before starting a new one
                if (ShowGame.currentGame) {
                    ShowGame.currentGame.stopGame();
                    ShowGame.currentGame = null;
                    // Add a small delay to ensure cleanup is complete
                    await new Promise(resolve => setTimeout(resolve, 50));
                }

                await TournamentUIManager.showPreGame(match.player1.alias, match.player2.alias);
                await TournamentUIManager.startCountdown();
                this.mostrarVistaJuego();
//                Router.navigate('tournament');
                await new Promise(resolve => setTimeout(resolve, 100));
                const game = new Game({
                    leftPlayer: match.player1.alias,
                    rightPlayer: match.player2.alias, maxScore: 3, gameMode: 'p-vs-p',
                    onFinish: (winnerAlias: string, player1Score: number, player2Score: number) => {
                        console.log(player1Score, player2Score);
                        match.player1.score = player1Score;
                        match.player2.score = player2Score;
                        match.winner = (match.player1.alias === winnerAlias) ? match.player1 : match.player2;
						sendGameService(match.type, match);
                        const torneo = getTournament();
                        if (match.winner.alias && match.winner.alias !== undefined) {
                            if (torneo)
                                console.log('tiene que actualizar info???')
                                // TournamentUIManager.updateBracket(torneo);
                        } else {
                            resetTournament();
                            Router.navigate('home');
                        }
                        resolve();
                    },
                });
                // Store the current game instance
                // ShowGame.currentGame = game;                
                game.resetGame();
                game.setGameOn();

                game.start();
            } finally {
                // Always unlock game creation
                ShowGame.isCreatingGame = false;
            }
        });
    }
}
