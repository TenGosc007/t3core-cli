import type { ToggleCommand } from "@/services/navigationService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

import { gameManager } from "../../engine";
import { gameState } from "../../services/gameState";

export class ToggleHistoryCommand implements ToggleCommand {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.H;
  }

  execute(): NavKey {
    const game = gameManager.getGame();

    if (game.getMovesCount() > 0) {
      gameState.toggleHistoryMode();
    }

    return NAV_KEYS.H;
  }
}
