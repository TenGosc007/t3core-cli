import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";
import type { ToggleCommand } from "@/services/navigationService";

import { gameManager } from "@/features/game/engine";
import { gameStateManager } from "@/features/game/services/gameState";
import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

export class ToggleHistoryCommand implements ToggleCommand {
  constructor(
    private readonly _game: GameEngine = gameManager.getGame(),
    private readonly _gameState: GameStateManager = gameStateManager,
  ) {}

  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.H;
  }

  execute(): NavKey {
    if (this._game.getMovesCount() > 0) {
      this._gameState.toggleHistoryMode();
    }

    return NAV_KEYS.H;
  }
}
