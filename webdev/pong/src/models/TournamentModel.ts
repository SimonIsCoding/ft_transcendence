export type Player = {
  alias: string;
};

export type Match = {
  player1: Player;
  player2: Player;
  winner: Player | null;
};

export class TournamentModel {
  players: Player[] = [];
  semifinal1: Match | null = null;
  semifinal2: Match | null = null;
  finalMatch: Match | null = null;
  winner: Player | null = null;

  addPlayer(alias: string) {
    this.players.push({ alias });
  }

  isReady(): boolean {
    return this.players.length === 4;
  }

  generateFirstMatch() {
    this.semifinal1 = {
      player1: { ...this.players[0] }, 
      player2: { ...this.players[1] },
      winner: null
    };
    console.log('semifinal1: ' + this.semifinal1)
    // this.semifinal2 = {
    //     player1: { ...this.players[2] },
    //     player2: { ...this.players[3] },
    //     winner: null
    // };
    // console.log('semifinal2: ' + this.semifinal2)
  }
  
  generateSecondMatch() {
    // this.semifinal1 = {
    //   player1: { ...this.players[0] }, 
    //   player2: { ...this.players[1] },
    //   winner: null
    // };
    // console.log('semifinal1: ' + this.semifinal1)
    this.semifinal2 = {
        player1: { ...this.players[2] },
        player2: { ...this.players[3] },
        winner: null
    };
    console.log('semifinal2: ' + this.semifinal2)
  }

  generateFinal() {
    if (this.semifinal1?.winner && this.semifinal2?.winner) {
      this.finalMatch = {
        player1: this.semifinal1.winner,
        player2: this.semifinal2.winner,
        winner: null
      };
    }
  }

  setWinner(winner: Player) {
    this.winner = winner;
  }

  saveToLocalStorage() {
    const historial = JSON.parse(localStorage.getItem('torneos') || '[]');
    historial.push({
      jugadores: this.players.map(p => p.alias),
      ganador: this.winner?.alias,
      fecha: new Date().toISOString()
    });
    localStorage.setItem('torneos', JSON.stringify(historial));
  }
}
