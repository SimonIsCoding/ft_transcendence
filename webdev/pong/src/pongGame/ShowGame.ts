import { Router } from "../router";
import type { Match } from '../models/TournamentModel';
import { Game } from "./Game";
import { GameRender } from './GameRender';
import { sendGameService } from "../services/gameService";
import { gameSettings } from "../controllers/gameSettingsControllers";
import { getUserInfo } from "../services/sidebarService/utilsSidebarService";

type GameMode = 'p-vs-ai' | 'p-vs-p';

export class ShowGame {
    static gameType: GameMode = 'p-vs-p';
    static getAIDifficulty: number;
    static getMaxScore: number;
    
    static inGame: boolean = false;
    static noWinner: boolean = true;
    static gameController: boolean = true;
    static otherPlayer: string = "User"; 
    static currentGame: Game | null = null; // Track current game instance
    static isCreatingGame: boolean = false; // Prevent race conditions 
    private renderGameCanvas() {
    let gameCanvasContainer = document.getElementById('gamesArea');
    let oneVsOneArea = document.getElementById('oneVsOneArea');
    let oneVsAIArea = document.getElementById('oneVsAIArea');
    
    const renderGame = new GameRender().render();
    if (gameCanvasContainer) {
            gameCanvasContainer.innerHTML = renderGame;
            oneVsAIArea?.classList.add('hidden')
            oneVsOneArea?.classList.add('hidden')
            gameCanvasContainer.classList.remove('hidden')
        }
    }
    
    async initGame(match: Match) {
        // Stop any existing game before starting a new one
        await ShowGame.cleanup();
        
        // this.renderCanvas();
        const gameArea = document.getElementById('gameArea');
        gameArea?.classList.add('hidden');
        ShowGame.noWinner = true;
        await this.playGame(match);
    }

    private showWinner(match: Match, type: boolean) {
        const gamesArea = document.getElementById('gamesArea');
        let winner = match.winner ? match.winner.alias : '';
        if (ShowGame.gameType === 'p-vs-ai' && type) {
            winner = "AI";
        }
        if (gamesArea && match.winner) {
            gamesArea.innerHTML = `            
                <!-- Pantalla de Ganador del Torneo -->
                <div class="text-center flex items-center flex-col justify-center h-full">
                    <svg width="122" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_176_1235" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="122" height="122">
                        <rect width="122" height="122" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_176_1235)">
                        <path d="M27.8017 99.1249V93.3566H94.1977V99.1249H27.8017ZM27.5768 82.5355L20.4499 41.5079C20.0915 41.6443 19.7463 41.7256 19.4142 41.7519C19.0821 41.7781 18.7368 41.7913 18.3785 41.7913C16.7942 41.7913 15.453 41.244 14.355 40.1494C13.257 39.0556 12.708 37.7127 12.708 36.1208C12.708 34.5348 13.257 33.164 14.355 32.0084C15.453 30.8528 16.795 30.275 18.381 30.275C19.9662 30.275 21.3361 30.8528 22.4909 32.0084C23.6465 33.164 24.2243 34.5348 24.2243 36.1208C24.2243 36.6783 24.151 37.2201 24.0044 37.7462C23.857 38.2723 23.6207 38.7409 23.2953 39.1518L41.5165 46.9038L58.5063 23.6184C57.4837 23.1753 56.6691 22.4932 56.0625 21.5723C55.4567 20.6522 55.1538 19.6203 55.1538 18.4766C55.1538 16.8897 55.7312 15.5316 56.886 14.4023C58.0408 13.2729 59.4111 12.7083 60.9971 12.7083C62.5823 12.7083 63.9535 13.2721 65.1108 14.3997C66.2673 15.5274 66.8455 16.8829 66.8455 18.4664C66.8455 19.633 66.5426 20.6726 65.9369 21.585C65.3302 22.4975 64.5317 23.1753 63.5413 23.6184L80.4828 46.9038L98.704 39.1518C98.4177 38.7527 98.1915 38.2846 98.0254 37.7475C97.8585 37.2103 97.7751 36.6681 97.7751 36.1208C97.7751 34.5348 98.3291 33.164 99.4373 32.0084C100.545 30.8528 101.882 30.275 103.448 30.275C105.034 30.275 106.404 30.8528 107.559 32.0084C108.714 33.164 109.291 34.5348 109.291 36.1208C109.291 37.7077 108.713 39.0492 107.555 40.1455C106.398 41.2427 105.025 41.7913 103.435 41.7913C103.097 41.7913 102.78 41.757 102.483 41.6883C102.186 41.6197 101.869 41.5333 101.533 41.4291L94.4226 82.5355H27.5768ZM32.4936 76.7684H89.554L94.8432 47.2063L78.527 54.1374L60.9997 29.942L43.4723 54.1374L27.1561 47.2063L32.4936 76.7684Z" fill="#fbd11b"/>
                        </g>
                    </svg>
                    <p class="text-6xl font-bold text-yellow-400 mt-2">${winner}</p>
                    <button id="reset-btn" class="mt-8 px-6 py-2 border border-yellow-400 text-yellow-400 font-bold rounded hover:bg-yellow-400 hover:text-black transition-colors">
                        continue
                    </button>
                </div>
                `;
            gamesArea.classList.remove('hidden');
            gamesArea.style.display = 'block';
            const resetBtn = document.getElementById('reset-btn');
            resetBtn?.addEventListener('click', () => {
                Router.navigate('home');
            });
        }
    }

    public playGame(match: Match): Promise<void> {
        return new Promise(async () => {
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
                
                this.renderGameCanvas();
                await new Promise(resolve => setTimeout(resolve, 100));
				if (ShowGame.gameType === 'p-vs-ai')
					ShowGame.otherPlayer = match.player2.alias;
                const game = new Game({
                    leftPlayer: match.player1.alias,
                    rightPlayer: match.player2.alias,
                    maxScore: gameSettings.scoreLimit,
                    gameMode: ShowGame.gameType,
                    aiDifficulty: gameSettings.iaDifficulty,
                    onFinish: async (winnerAlias: string, player1Score: number, player2Score: number) => {
                        match.player1.score = player1Score;
                        match.player2.score = player2Score;
                        if (ShowGame.gameType == 'p-vs-ai') {
                            match.player1.alias = match.player2.alias;
                            match.player2.alias = 'AI';
                        }
                        match.winner = (match.player1.alias === winnerAlias) ? match.player1 : match.player2;
						// sendGameService(ShowGame.gameType, match);
						// await getUserInfo();
						await finishMatchHandler(match);

                        if (ShowGame.noWinner && (window.location.pathname.includes("/game") || window.location.pathname.includes("/gameai"))) { 
                                if (match.winner.alias && match.winner.alias !== undefined) {
                                    this.showWinner(match, player2Score > player1Score);
                                    let winner = document.getElementById('winner-screen');
                                    winner?.classList.remove('hidden');
                                    ShowGame.noWinner = false;
                                } else if (window.location.pathname.includes("/game") || window.location.pathname.includes("/gameai")) {
                                    Router.navigate('home');
                                }
                        } else if (window.location.pathname.includes("/game") || window.location.pathname.includes("/gameai")) {
                            Router.navigate('home');
                        }
                        
                        // Clear the current game reference when finished
                        ShowGame.currentGame = null;
                        game.resetGame();
                    },
                });
                
                // Store the current game instance
                ShowGame.currentGame = game;
                
                game.resetGame();
                game.setGameOn();
                game.start();
                
            } finally {
                // Always unlock game creation
                ShowGame.isCreatingGame = false;
            }
        });
    }

    /**
     * Static method to cleanup any running game and prevent race conditions
     */
    static async cleanup() {
        
        // Wait if another game is being created
        while (ShowGame.isCreatingGame) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        if (ShowGame.currentGame) {
            ShowGame.currentGame.stopGame();
            ShowGame.currentGame = null;
        }
        
        ShowGame.noWinner = true;
        ShowGame.inGame = false;
    }
}

export async function finishMatchHandler(match: Match)
{
	console.log(`match.type = ${match.type}`)
    await sendGameService(match.type, match);
    await getUserInfo();
}