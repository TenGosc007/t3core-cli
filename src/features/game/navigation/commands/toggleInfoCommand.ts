import type { KeyCommand } from "@/services/navigationService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

import { gameState } from "../../services/gameState";

export class ToggleInfoCommand implements KeyCommand<number> {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.I;
  }

  execute(position: number): number {
    gameState.toggleState("info");
    return position;
  }
}
