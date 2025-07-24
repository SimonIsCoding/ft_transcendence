export type Player = {
    id: string;
    username: string;
  };
  
  export type Match = {
    player1: Player;
    player2: Player;
    result: 'pending' | 'player1' | 'player2';
  };
  
  export class TournamentModel {
    private players: Player[] = [];
    private matches: Match[] = [];
    private currentMatchIndex = 0;
  
    addPlayer(player: Player) {
      this.players.push(player);
    }
  
    getPlayers() {
      return [...this.players];
    }
  
    getPlayerCount() {
      return this.players.length;
    }
  
    generateMatches() {
      const matches: Match[] = [];
      for (let i = 0; i < this.players.length; i++) {
        for (let j = i + 1; j < this.players.length; j++) {
          matches.push({
            player1: this.players[i],
            player2: this.players[j],
            result: 'pending'
          });
        }
      }
      this.matches = matches;
      this.currentMatchIndex = 0;
    }
  
    getCurrentMatch(): Match | null {
      return this.matches[this.currentMatchIndex] ?? null;
    }
  
    reportMatchResult(winner: Player) {
      const match = this.getCurrentMatch();
      if (!match) return;
      match.result = match.player1.id === winner.id ? 'player1' : 'player2';
      this.currentMatchIndex++;
    }
  
    getAllMatches() {
      return [...this.matches];
    }
  
    hasMoreMatches() {
      return this.currentMatchIndex < this.matches.length;
    }
  }
  