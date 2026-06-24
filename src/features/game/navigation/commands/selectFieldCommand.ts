import type { KeyCommand } from "@/services/navigationService";

import { INITIAL_BOARD_POSITION } from "@/features/game/constants/game.constants";
import { gameManager } from "@/features/game/engine";
import { validateInputEntry } from "@/features/game/validation/validateInputEntry";
import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

const ReturnKeys = [NAV_KEYS.RETURN, NAV_KEYS.SPACE] as const;

export class SelectFieldCommand implements KeyCommand {
  canHandle(key: NavKey): boolean {
    return ReturnKeys.some((returnKey) => returnKey === key);
  }

  execute(position: number): number {
    const game = gameManager.getGame();

    if (game.getStatus().status !== "running") {
      return INITIAL_BOARD_POSITION;
    }

    validateInputEntry({ entryProp: position, game, isArrowKeyOn: true });
    game.makeMove(position);
    return position;
  }
}
