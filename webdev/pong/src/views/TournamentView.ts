import { TournamentController } from '../controllers/TournamentController';
import { userUnloggedSidebar } from './sidebarBehavior';
import { playButton } from './playButton';
import { TournamentModel } from '../models/TournamentModel';
// import { GameView } from '../views/game';

const controller = new TournamentController(new TournamentModel());

export const TournamentView = {
  render(): string {
    return `
      <div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">
        ${userUnloggedSidebar.render()}
        <div class="flex flex-col items-center justify-center w-full">
             ${playButton.init()}
        </div>
        `;
    },
    
    init(): void {
        controller.iniciarTorneo();
        console.log('entraa')
    }
};

// ${playButton.render()} esto da error con el game para el torneo