import type { KeyCommand } from "@/services/navigationService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

import { gameState } from "../../services/gameState";

export class ToggleInfoCommand implements KeyCommand {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.I;
  }

  execute(position: number): number {
    gameState.toggleInfo();
    return position;
  }
}
