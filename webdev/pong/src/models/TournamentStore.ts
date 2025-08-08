// TournamentStore.ts
import { TournamentModel } from './TournamentModel';

export let currentTournament: TournamentModel | null = null;

export function setTournament(tournament: TournamentModel): void {
	currentTournament = tournament;
}

export function resetTournament(): void {
	currentTournament = null;
}
