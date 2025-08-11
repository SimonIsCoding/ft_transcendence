import { TournamentModel } from './TournamentModel';

export let currentTournament: TournamentModel | null = null;

export function setTournament(tournament: TournamentModel): void {
	currentTournament = tournament;
}

export function resetTournament(): void {
	currentTournament = null;
}

export let matchInfo: { 
    player1: string, 
    player2: string, 
    partidoActivo: boolean, // <-- LA NUEVA BANDERA
    onMatchEnd: (winnerAlias: string) => void 
} | null = null;

export function setMatchInfo(info: typeof matchInfo): void {
    matchInfo = info;
}