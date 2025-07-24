import { TournamentModel, type Player, type Match } from '../models/TournamentModel';

const model = new TournamentModel();

// document.getElementById('join-tournament-btn')?.addEventListener('click', () => {
const username = prompt('Introduce tu alias para el torneo') || 'defaultUsername';
// if (!username) username = '';

const player: Player = {
    id: Math.random().toString(36).substring(2),
    username,
};

model.addPlayer(player);
renderPlayers(model.getPlayers());

if (model.getPlayerCount() === 1) {
    renderStatus("Esperando a otro jugador...");
}

if (model.getPlayerCount() >= 2) {
    model.generateMatches();
    playNextMatch();
}
// });




function playNextMatch() {
    const match = model.getCurrentMatch();
    if (!match) {
        renderStatus("Torneo finalizado");
        return;
    }

    renderStatus(`Jugando: ${match.player1.username} vs ${match.player2.username}`);

    // ⚠️ Simular resultado después de 5 segundos
    setTimeout(() => {
        const winner = Math.random() > 0.5 ? match.player1 : match.player2;
        alert(`Ganó ${winner.username}`);
        model.reportMatchResult(winner);
        renderMatchList(model.getAllMatches());
        playNextMatch(); // Repetimos con el siguiente
    }, 5000);
}

function renderPlayers(players: Player[]) {
    const el = document.getElementById('players-list');
    if (!el) return;
    el.innerHTML = players.map(p => `<li>${p.username}</li>`).join('');
}

function renderMatchList(matches: Match[]) {
    const el = document.getElementById('match-list');
    if (!el) return;
    el.innerHTML = matches.map(m => `
      <div>${m.player1.username} vs ${m.player2.username} — ${m.result}</div>
    `).join('');
}

function renderStatus(message: string) {
    const el = document.getElementById('status');
    if (el) el.textContent = message;
}
