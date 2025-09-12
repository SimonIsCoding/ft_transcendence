import type { Match } from "../models/TournamentModel";
import { currentTournament, getMatchInfo, resetTournament } from "../models/TournamentStore";
import { TournamentUIManager } from "../views/TournamentUIManager";
import { Game } from "../pongGame/Game";
import { enviarLogALogstash } from "../utils/logstash";
import { closeAllMenus } from "../views/sidebar/sidebarUtils";
import { finishMatchHandler, ShowGame } from "../pongGame/ShowGame";
import { gameSettings } from "./gameSettingsControllers";

export class TournamentController {
  async iniciarTorneo() {
    if (!currentTournament?.isReady()) return;
    currentTournament?.generateMatches();
    let semifinal1 = await this.jugarPartido(currentTournament.semifinal1!);
    currentTournament.semifinal1 = semifinal1;
    this.mostrarVistaTorneo();
    await this.esperarClickDelUsuario();
    let semifinal2 = await this.jugarPartido(currentTournament.semifinal2!);
    currentTournament.semifinal2 = semifinal2;
    this.mostrarVistaTorneo();
    await this.esperarClickDelUsuario();
    if (semifinal1.winner && semifinal2.winner) {
      currentTournament.generateFinal();
      await this.jugarPartido(currentTournament.finalMatch!);
      const ganador = currentTournament.finalMatch!.winner!;
      currentTournament.setWinner(ganador);
      this.mostrarVistaTorneo();
      TournamentUIManager.showTournamentWinner(ganador.alias);
      resetTournament();
    }
  }

  private async esperarClickDelUsuario(): Promise<void> {
    let next = document.getElementById("nextMatchBtn");
    if (next) next.classList.remove("hidden");
    let play = document.getElementById("playtournamentBtn");
    if (play) play.classList.remove("inline-block");
    return new Promise((resolve) => {
      const btn = document.getElementById("nextMatchBtn");
      if (!btn) {
        resolve();
        return;
      }
      const handler = () => {
        const submenus = document.querySelectorAll<HTMLElement>(".submenu");
        closeAllMenus(submenus);
        btn.removeEventListener("click", handler);
        resolve();
      };
      btn.addEventListener("click", handler);
    });
  }

  private mostrarVistaTorneo() {
    const tournamentArea = document.getElementById("esquemaTorneo");
    const gameArea = document.getElementById("gameCanvasContainer");
    if (tournamentArea) tournamentArea.style.display = "block";
    if (gameArea) gameArea.style.display = "none";
  }

  private mostrarVistaJuego() {
    const tournamentArea = document.getElementById("esquemaTorneo");
    const gameArea = document.getElementById("gameCanvasContainer");
    if (tournamentArea) tournamentArea.style.display = "none";
    if (gameArea) gameArea.style.display = "block";
  }

  private jugarPartido(match: Match): Promise<Match> {
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
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        await TournamentUIManager.showPreGame(
          match.player1.alias,
          match.player2.alias
        );
        await TournamentUIManager.startCountdown();
        this.mostrarVistaJuego();
        await new Promise((resolve) => setTimeout(resolve, 100));
        const game = new Game ({
          leftPlayer: match.player1.alias,
          rightPlayer: match.player2.alias,
          maxScore: gameSettings.scoreLimit,
          gameMode: "p-vs-p",
          onFinish: async (
            winnerAlias: string,
            player1Score: number,
            player2Score: number
          ) => {
            match.player1.score = player1Score;
            match.player2.score = player2Score;
            match.winner =
              match.player1.alias == winnerAlias
                ? match.player1
                : match.player2;
            // sendGameService(match.type, match);
			await finishMatchHandler(match);
            enviarLogALogstash(match.type, {
              tournament_id: "tourn-" + Date.now(),
              match: match,
            });
            const torneo = getMatchInfo();
            if (match.winner.alias && match.winner.alias != undefined) {
              if (torneo) TournamentUIManager.updateBracket(match);
            }
            resolve(match);
          },
        });
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
