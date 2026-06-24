import type { ToggleCommand } from "@/services/navigationService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

import { gameState } from "../../services/gameState";

export class ToggleInfoCommand implements ToggleCommand {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.I;
  }

  execute(): NavKey {
    gameState.toggleInfo();
    return NAV_KEYS.I;
  }
}
