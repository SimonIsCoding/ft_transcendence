// import { Router } from "../router";
import type { Match } from '../models/TournamentModel';
// import { tournamentAreaInit } from '../views/sidebar/playBtn/playSidebarBehavior';
import { handleSidebar } from '../views/sidebar/sidebarBehavior';
// import { TournamentArea } from '../views/TournamentArea';
// import { TournamentUIManager } from "../views/TournamentUIManager";
import { Game } from "./Game";
import { GameRender } from './GameRender';
// import { GameRender } from './GameRender';

export class ShowGame {
    
    // private showGameView() {
    //     const tournamentArea = document.getElementById('esquemaTorneo');
    //     const gameArea = document.getElementById('gameCanvasContainer');
    //     if (tournamentArea) tournamentArea.style.display = 'none';
    //     if (gameArea) gameArea.style.display = 'block';
    // }

    private renderGameCanvas() {
        let gameCanvasContainer = document.getElementById('oneVsOneArea');

        // if (!gameCanvasContainer) {
        //   gameCanvasContainer = document.createElement('div');
        //   gameCanvasContainer.id = 'gameCanvasContainer';
        //   gameCanvasContainer.className = 'hidden content bg-[#fbd11b] h-full';
        // }
        
        const renderGame = new GameRender().render();
        if (gameCanvasContainer) {
            gameCanvasContainer.innerHTML = renderGame;
        }
    }
    
    // private renderCanvas() {
    //     let gameCanvasContainer = document.getElementById('app');
        
    //     const renderWinner = TournamentArea.render();
    //     if (gameCanvasContainer) {
    //         gameCanvasContainer.innerHTML = renderWinner;
    //     }

    // }
    
    async initGame(match: Match) {
        // this.renderCanvas();
        await this.playGame(match);
    }

    public playGame(match: Match): Promise<void> {
        return new Promise(async (resolve) => {

            // await TournamentUIManager.showPreGame(match.player1.alias, match.player2.alias);
            // await TournamentUIManager.startCountdown();
            // this.showGameView();
            await handleSidebar();
            this.renderGameCanvas();
            // Router.navigate('game');
            await new Promise(resolve => setTimeout(resolve, 100));

            const game = new Game({
                leftPlayer: match.player1.alias,
                rightPlayer: match.player2.alias, maxScore: 3, gameMode: 'p-vs-p',
                onFinish: (winnerAlias: string, player1Score: number, player2Score: number) => {
                    console.log(player1Score, player2Score);
                    match.player1.score = player1Score;
                    match.player2.score = player2Score;
                    match.winner = (match.player1.alias === winnerAlias) ? match.player1 : match.player2;
                    console.log('entra en onMatchEnd');
                    resolve();
                },
            });
            game.start();
        });
    }
}
