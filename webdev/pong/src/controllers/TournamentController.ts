import type { Match } from '../models/TournamentModel';
import { Router } from '../router';
import { currentTournament, setMatchInfo, matchInfo } from '../models/TournamentStore';
import { TournamentUIManager } from '../views/TournamentUIManager';

export class TournamentController {
    private tournamentStartTime: number = 0;
    private matchStartTimes: Map<Match, number> = new Map();

    async iniciarTorneo() {
        if (!currentTournament?.isReady()) return;

        this.tournamentStartTime = Date.now();
        this.enviarLog('tournament_created', {
            tournament_id: 'tourn-' + Date.now(),
            players_count: currentTournament.players.length,
            player_aliases: currentTournament.players.map(p => p.alias)
        });
        currentTournament?.generateMatches();
        await this.jugarPartido(currentTournament.semifinal1!);
        TournamentUIManager.updateBracket(currentTournament);
        this.mostrarVistaTorneo();
        await this.esperarClickDelUsuario();
        await this.jugarPartido(currentTournament.semifinal2!);
        TournamentUIManager.updateBracket(currentTournament);
        this.mostrarVistaTorneo();
        await this.esperarClickDelUsuario();
        if (currentTournament.semifinal1?.winner && currentTournament.semifinal2?.winner) {
            currentTournament.generateFinal();
            await this.jugarPartido(currentTournament.finalMatch!);
            const ganador = currentTournament.finalMatch!.winner!;
            currentTournament.setWinner(ganador);
            this.enviarLog('tournament_completed', {
                winner: ganador.alias,
                total_matches: 3, // Semifinal1 + Semifinal2 + Final
                duration_minutes: Math.floor((Date.now() - this.tournamentStartTime) / 60000)
            });
            TournamentUIManager.updateBracket(currentTournament);
            this.mostrarVistaTorneo();
            TournamentUIManager.showTournamentWinner(ganador.alias);
            currentTournament.saveToLocalStorage();
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
            this.enviarLog('match_started', {
                match_type: this.obtenerTipoPartido(match),
                player1: match.player1.alias,
                player2: match.player2.alias,
                match_id: 'match-' + Date.now()
            });
            await TournamentUIManager.showPreGame(match.player1.alias, match.player2.alias);
            await TournamentUIManager.startCountdown();
            this.mostrarVistaJuego();
            setMatchInfo({
                player1: match.player1.alias,
                player2: match.player2.alias,
                partidoActivo: true,
                onMatchEnd: (winnerAlias: string, player1Score: number, player2Score: number) => {
                    match.player1.score = player1Score;
                    match.player2.score = player2Score;
                    match.winner = (match.player1.alias === winnerAlias) ? match.player1 : match.player2;
                    const startTime = this.matchStartTimes.get(match) || Date.now();
                    this.enviarLog('match_ended', {
                        match_type: this.obtenerTipoPartido(match),
                        player1: match.player1.alias,
                        player2: match.player2.alias,
                        winner: winnerAlias,
                        score: `${player1Score}-${player2Score}`,
                        duration_seconds: Math.floor((Date.now() - startTime) / 1000)
                    });
                    if (matchInfo)
                        setMatchInfo({ ...matchInfo, partidoActivo: false });
                    resolve();
                }
            });
            Router.navigate('tournament');
        });
    }
    private enviarLog(eventType: string, data: any) {
        TournamentLogger.enviarLog(eventType, data);
    }

    private obtenerTipoPartido(match: Match): string {
        if (match === currentTournament?.semifinal1) return 'semifinal_1';
        if (match === currentTournament?.semifinal2) return 'semifinal_2';
        if (match === currentTournament?.finalMatch) return 'final';
        return 'unknown';
    }
}

class TournamentLogger {

    static enviarLog(eventType: string, data: any) {
        const logEntry = JSON.stringify({
            service: 'tournament-service',
            level: 'INFO',
            event_type: eventType,
            timestamp: new Date().toISOString(),
            environment: 'development',
            ...data
        });

        // Usar TCP en lugar de HTTP - MUCHO más fiable
        this.enviarLogTCP(logEntry);
    }
    static enviarLogTCP(logData: string) {
        // Usar XMLHttpRequest para TCP (funciona en navegador)
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5050', false); // Puerto 5050 para TCP
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(logData);

        // Alternative: usar fetch con modo 'no-cors' para desarrollo
        fetch('http://localhost:5050', {
            method: 'POST',
            mode: 'no-cors', // ← Importante para evitar problemas CORS
            headers: { 'Content-Type': 'application/json' },
            body: logData
        }).catch(() => {
            console.log('Log enviado via TCP (puerto 5050)');
        });
    }
}