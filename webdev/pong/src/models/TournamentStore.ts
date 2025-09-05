import { TournamentModel } from './TournamentModel';

export let currentTournament: TournamentModel | null = null;

export function setTournament(tournament: TournamentModel): void {
	currentTournament = tournament;
}

export function resetTournament(): void {
    currentTournament = null;
}

export function getTournament(): TournamentModel | null {
    return currentTournament;
}

export let matchInfo: { 
    player1: string, 
    player2: string, 
    partidoActivo: boolean,
    onMatchEnd: (winnerAlias: string, player1Score: number, player2Score: number) => void 
} | null = null;

export function setMatchInfo(info: typeof matchInfo): void {
    matchInfo = info;
}

export function getMatchInfo(): typeof matchInfo {
    return matchInfo;
}