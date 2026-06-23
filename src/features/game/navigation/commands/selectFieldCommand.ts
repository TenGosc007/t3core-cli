import type { KeyHandler } from "@/services/keyHandlerService";
import type { KeyCommand } from "@/services/navigationService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

import { getGame } from "../../services/gameSession";
import { validateInputEntry } from "../../validation/validateInputEntry";

const ReturnKeys = [NAV_KEYS.RETURN, NAV_KEYS.SPACE] as const;

export class SelectFieldCommand implements KeyCommand<number> {
  constructor(private readonly handler: KeyHandler) {}

  canHandle(key: NavKey): boolean {
    return ReturnKeys.some((returnKey) => returnKey === key);
  }

  execute(position: number): number {
    const game = getGame();

    if (game.gameStatus.status !== "running") {
      this.handler.resetPosition();
      if (typeof this.handler.initialPosition === "number") {
        return this.handler.initialPosition;
      }

      return position;
    }

    validateInputEntry(position, this.handler.running);
    game.savePlayerMove(position);
    return position;
  }
}
