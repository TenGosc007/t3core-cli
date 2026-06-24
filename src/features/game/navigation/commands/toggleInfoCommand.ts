import type { ToggleCommand } from "@/services/navigationService";

import { gameStateManager } from "@/features/game/services/gameState";
import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

export class ToggleInfoCommand implements ToggleCommand {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.I;
  }

  execute(): NavKey {
    gameStateManager.toggleInfo();
    return NAV_KEYS.I;
  }
}
