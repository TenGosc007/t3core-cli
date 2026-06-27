import type { GameStateManager } from "@/features/game/services/gameState";
import type { ToggleCommand } from "@/services/navigationService";

import { gameStateManager } from "@/features/game/services/gameState";
import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

export class ToggleInfoCommand implements ToggleCommand {
  constructor(
    private readonly _gameState: GameStateManager = gameStateManager,
  ) {}

  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.I;
  }

  execute(): NavKey {
    this._gameState.toggleInfo();
    return NAV_KEYS.I;
  }
}
