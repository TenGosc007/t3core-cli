import type { ToggleCommand } from "@/services/navigationService";

import { gameManager } from "@/features/game/engine";
import { gameStateManager } from "@/features/game/services/gameState";
import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

export class ToggleHistoryCommand implements ToggleCommand {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.H;
  }

  execute(): NavKey {
    const game = gameManager.getGame();

    if (game.getMovesCount() > 0) {
      gameStateManager.toggleHistoryMode();
    }

    return NAV_KEYS.H;
  }
}
