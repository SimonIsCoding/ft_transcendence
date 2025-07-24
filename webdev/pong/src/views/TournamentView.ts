// import { TournamentModel } from "../models/TournamentModel";
// import '../controllers/TournamentController';

export class TournamentView {
    render(): string {
        // const app = document.getElementById('app'); // Asegúrate de que este ID exista en tu HTML principal
        // if (app) {
            return `
                <h3>Participantes:</h3>
                <ul id="players-list"></ul>

                <h3>Partidas:</h3>
                <div id="matches-list"></div>

                <h3>Estado:</h3>
                <div id="status"></div>
            `;
        // }
        // return ''; // Return an empty string if app is not found
    }
}