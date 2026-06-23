import type { KeyCommand } from "@/services/navigationService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

import { getGame } from "../../services/gameSession";
import { gameState } from "../../services/gameState";

export class ToggleHistoryCommand implements KeyCommand {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.H;
  }

  execute(position: number): number {
    const game = getGame();

    if (game.movesCount > 0) {
      gameState.toggleState("historyMode");
    }

    return position;
  }
}
