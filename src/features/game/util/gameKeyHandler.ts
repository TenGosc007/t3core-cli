import type {
  KeyHandler,
  KeyHandlerProps,
  ReadlineKey,
} from "@/services/keyHandlerService";

import { NAV_KEYS } from "@/global/navigationKeys";
import { GridNavigationStrategy } from "@/services/navigationService/strategies/gridNavigationStrategy";

import { actionKeysHandler } from "../components/InputEntry/utils/actionKeysHandler";
import { INITIAL_BOARD_POSITION } from "../constants/game.constants";
import { getGame } from "../services/gameSession";
import { validateInputEntry } from "../validation/validateInputEntry";

const ReturnKeys = [NAV_KEYS.RETURN, NAV_KEYS.SPACE] as const;

const BOARD_ROWS = 3;
const BOARD_COLS = 3;

const gridNavigationStrategy = new GridNavigationStrategy(BOARD_ROWS, BOARD_COLS);

const getCurrentPosition = (position: number | string | null) => {
  if (typeof position === "number") return position;
  return INITIAL_BOARD_POSITION;
};

const enterKeyHandler = (
  nextPos: number,
  key: ReadlineKey,
  handler: KeyHandler,
) => {
  const game = getGame();

  if (ReturnKeys.some((k) => k === key.name)) {
    if (game.gameStatus.status !== "running") {
      handler.resetPosition();
      return handler.initialPosition;
    }

    validateInputEntry(nextPos, handler.running);
    game.savePlayerMove(nextPos);
    return nextPos;
  }
};

export const gameKeyHandler = (props: KeyHandlerProps) => {
  const { key, position, handler } = props;
  if (!key.name) return null;

  const currentPos = getCurrentPosition(position);
  const nextPos = gridNavigationStrategy.move(currentPos, key.name);

  const enterPressed = enterKeyHandler(nextPos, key, handler);
  if (enterPressed) return enterPressed;

  const actionKey = actionKeysHandler(key.name);
  if (actionKey) return actionKey;

  return nextPos;
};
