import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";
import type { KeyCommand } from "@/services/navigationService";

import { INITIAL_BOARD_POSITION } from "@/features/game/constants/game.constants";
import { gameManager } from "@/features/game/engine";
import { gameStateManager } from "@/features/game/services/gameState";
import { validateInputEntry } from "@/features/game/validation/validateInputEntry";
import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

const ReturnKeys = [NAV_KEYS.RETURN, NAV_KEYS.SPACE] as const;

export class SelectFieldCommand implements KeyCommand {
  constructor(
    private readonly _game: GameEngine = gameManager.getGame(),
    private readonly _gameState: GameStateManager = gameStateManager,
  ) {}

  canHandle(key: NavKey): boolean {
    return ReturnKeys.some((returnKey) => returnKey === key);
  }

  execute(position: number): number {
    if (this._game.isGameOver()) {
      return INITIAL_BOARD_POSITION;
    }

    validateInputEntry({
      entryProp: position,
      game: this._game,
      isArrowKeyOn: true,
      isInHistoryMode: this._gameState.historyMode,
      gameState: this._gameState,
    });
    this._game.makeMove(position);
    return position;
  }
}
