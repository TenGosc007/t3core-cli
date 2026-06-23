import type { KeyCommand } from "@/services/navigationService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

import { INITIAL_BOARD_POSITION } from "../../constants/game.constants";
import { getGame } from "../../services/gameSession";
import { validateInputEntry } from "../../validation/validateInputEntry";

const ReturnKeys = [NAV_KEYS.RETURN, NAV_KEYS.SPACE] as const;

export class SelectFieldCommand implements KeyCommand {
  canHandle(key: NavKey): boolean {
    return ReturnKeys.some((returnKey) => returnKey === key);
  }

  execute(position: number): number {
    const game = getGame();

    if (game.gameStatus.status !== "running") {
      return INITIAL_BOARD_POSITION;
    }

    validateInputEntry(position, true);
    game.savePlayerMove(position);
    return position;
  }
}
