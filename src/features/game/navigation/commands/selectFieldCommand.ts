import type { KeyHandler } from "@/services/keyHandlerService";
import type { KeyCommand } from "@/services/navigationService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

import { getGame } from "../../services/gameSession";
import { validateInputEntry } from "../../validation/validateInputEntry";

const ReturnKeys = [NAV_KEYS.RETURN, NAV_KEYS.SPACE] as const;

export class SelectFieldCommand implements KeyCommand {
  constructor(private readonly getHandler: () => KeyHandler | null) {}

  canHandle(key: NavKey): boolean {
    return ReturnKeys.some((returnKey) => returnKey === key);
  }

  execute(position: number): number {
    const handler = this.getHandler();
    if (!handler) return position;

    const game = getGame();

    if (game.gameStatus.status !== "running") {
      handler.resetPosition();
      if (typeof handler.initialPosition === "number") {
        return handler.initialPosition;
      }

      return position;
    }

    validateInputEntry(position, handler.running);
    game.savePlayerMove(position);
    return position;
  }
}
