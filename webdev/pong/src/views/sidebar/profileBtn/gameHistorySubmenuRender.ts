import { renderBackButton } from '../sidebarUtils.ts'
import type { matchid } from '../../../services/gameService.ts'

export function gameHistorySubmenuRender(): string {
  return `
    <div id="gameHistorySubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5 h-screen overflow-y-auto">
      ${renderBackButton("backBtnGameHistorySubmenu")}
      <p id="gameHistorySubmenuName" class="font-bold text-center pt-5">Game History</p>
      <hr class="w-full border-t-1.5 border-black" />
      <div id="gameHistoryContainer" class="flex flex-col w-[90%] space-y-5">
      </div>
    </div>
  `;
}

export function renderGameHistoryCard(match: matchid): string {
  return `
    <div class="flex flex-col rounded-2xl w-full space-y-2 shadow-base shadow-gray-600 px-5 py-3 bg-black">
      <div class="flex w-full justify-between items-center text-white text-sm">
        <!-- User -->
        <div class="flex flex-col items-start">
          <span class="font-semibold">${match.player1}</span>
          <span class="text-xs text-gray-400">Score: ${match.scorePlayer1}</span>
        </div>

        <!-- VS & date -->
        <div class="flex flex-col items-center">
          <span class="font-bold">VS</span>
          <span class="text-xs text-gray-400">${match.finished_at}</span>
        </div>

        <!-- Opponent -->
        <div class="flex flex-col items-end">
          <span class="font-semibold">${match.player2}</span>
          <span class="text-xs text-gray-400">Score: ${match.scorePlayer2}</span>
        </div>
      </div>
    </div>
  `;
}
