import type { Match } from "../models/TournamentModel";
import { Router } from "../router";
import { TournamentArea } from "./TournamentArea";

class UIManager {

    public showPreGame(player1: string, player2: string): Promise<void> {
        return new Promise(resolve => {
            const overlay = document.getElementById('game-overlay');
            const preGameScreen = document.getElementById('pre-game-screen');
            const playerVsPlayerText = document.getElementById('player-vs-player');
            const countdownText = document.getElementById('countdown-text');
            countdownText!.textContent = '';
            playerVsPlayerText!.textContent = `${player1} vs ${player2}`;

            preGameScreen?.classList.remove('hidden');
            overlay?.classList.remove('hidden');
            overlay?.classList.add('flex');

            setTimeout(() => {
                preGameScreen?.classList.add('hidden');
                resolve();
            }, 3000);
        });
    }

    public startCountdown(): Promise<void> {
        return new Promise(resolve => {

            const overlay = document.getElementById('game-overlay');
            const preGameScreen = document.getElementById('pre-game-screen');
            const countdownScreen = document.getElementById('countdown-screen');
            const countdownText = document.getElementById('countdown-text');
            preGameScreen?.classList.add('hidden');
            countdownScreen?.classList.remove('hidden');

            let count = 3;
            countdownText!.textContent = String(count);

            const interval = setInterval(() => {
                count--;
                if (count > 0) {
                    countdownText!.textContent = String(count);
                } else if (count === 0) {
                    countdownText!.textContent = 'GO!';
                } else {
                    clearInterval(interval);
                    overlay?.classList.add('hidden');
                    overlay?.classList.remove('flex');
                    resolve();
                }
            }, 1000);
        });
    }

    public updateBracket(match: Match)
    {
        if (match.type == 'semifinal1')
        {
            const p1_input = document.querySelector('#alias1') as HTMLInputElement;
            const p1_points = document.querySelector('#alias1-point') as HTMLInputElement;
            const p2_input = document.querySelector('#alias2') as HTMLInputElement;
            const p2_points = document.querySelector('#alias2-point') as HTMLInputElement;
            p1_input.value = match.player1.alias;
            p2_input.value = match.player2.alias;
            p1_input.disabled = true;
            p2_input.disabled = true;

            p1_points.textContent = match.player1.score?.toString() ?? '0';
            p2_points.textContent = match.player2.score?.toString() ?? '0';

            if (match.winner) {
                const winnerSlot = document.querySelector('#final2');
                if (winnerSlot) winnerSlot.textContent = match.winner.alias;
                if (match.winner.alias === match.player1.alias) {
                    p1_input.closest('.flex')?.classList.add('winner-bg');
                } else {
                    p2_input.closest('.flex')?.classList.add('winner-bg');
                }
            }
        }
        else if (match.type == 'semifinal2')
        {
            const p1_input = document.querySelector('#alias3') as HTMLInputElement;
            const p2_input = document.querySelector('#alias4') as HTMLInputElement;
            const p1_points = document.querySelector('#alias3-point') as HTMLElement;
            const p2_points = document.querySelector('#alias4-point') as HTMLElement;

            p1_input.value = match.player1.alias;
            p2_input.value = match.player2.alias;
            p1_input.disabled = true;
            p2_input.disabled = true;

            p1_points.textContent = match.player1.score?.toString() ?? '0';
            p2_points.textContent = match.player2.score?.toString() ?? '0';

            p1_input.closest('.flex')?.classList.remove('winner-bg');
            p2_input.closest('.flex')?.classList.remove('winner-bg');

            if (match.winner) {
                const finalist2Slot = document.querySelector('#final1');
                if (finalist2Slot) finalist2Slot.textContent = match.winner.alias;
                if (match.winner.alias === match.player1.alias) {
                    p1_input.closest('.flex')?.classList.add('winner-bg');
                } else {
                    p2_input.closest('.flex')?.classList.add('winner-bg');
                }
            }
        }
        else if (match.type == 'final')
        {
            const f1_input = document.querySelector('#final1') as HTMLElement;
            const f2_input = document.querySelector('#final2') as HTMLElement;

            const f1_point = document.querySelector('#final1-point') as HTMLElement;
            const f2_point = document.querySelector('#final2-point') as HTMLElement;

            f1_input.textContent = match.player1.alias;
            f2_input.textContent = match.player2.alias;

            f1_point.textContent = match.player1.score?.toString() ?? '0';
            f2_point.textContent = match.player2.score?.toString() ?? '0';

            f1_input.closest('.flex')?.classList.remove('winner-bg');
            f2_input.closest('.flex')?.classList.remove('winner-bg');

            if (match.winner) {
                if (match.winner.alias === match.player1.alias) {
                    f1_input.closest('.flex')?.classList.add('winner-bg');
                } else {
                    f2_input.closest('.flex')?.classList.add('winner-bg');
                }
            }
        }
    }

    public showTournamentWinner(winnerAlias: string) {
        const overlay = document.getElementById('game-overlay');
        const winnerScreen = document.getElementById('winner-screen');
        const tournamentWinnerName = document.getElementById('winner-name');
        const countdownScreen = document.getElementById('countdown-screen');

        tournamentWinnerName!.textContent = winnerAlias;
        winnerScreen?.classList.remove('hidden');
        overlay?.classList.remove('hidden');
        overlay?.classList.add('flex');
        countdownScreen?.classList.add('hidden');
        document.getElementById('showResumBtn')!.onclick = () => {
            let overlay = document.getElementById('game-overlay');
            overlay?.classList.add('hidden');
            let next = document.getElementById('nextMatchBtn');
            next?.classList.add('hidden');
            let resetTournamentBtn = document.getElementById('resetTournamentBtn');
            if (resetTournamentBtn) {
                resetTournamentBtn.classList.remove('hidden');
            }
        };

        document.getElementById('resetTournamentBtn')!.onclick = () => {
            let overlay = document.getElementById('game-overlay');
            overlay?.classList.add('hidden');
            let next = document.getElementById('nextMatchBtn');
            next?.classList.add('hidden');
            TournamentArea.render();
            Router.navigate('home');
        }
    }

}

export const TournamentUIManager = new UIManager();