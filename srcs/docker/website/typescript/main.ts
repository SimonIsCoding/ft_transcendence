import {draw} from "./game/game.js";
import {setupTournamentUI } from "./tournament/tournament.js"

setupTournamentUI();
window.addEventListener("DOMContentLoaded", () => {
	draw();
});

