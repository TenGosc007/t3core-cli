import type { NavKey } from "@/global/navigationKeys";
import type {
  KeyHandler,
  KeyHandlerProps,
  ReadlineKey,
} from "@/services/keyHandlerService";

import { NAV_KEYS } from "@/global/navigationKeys";

import { actionKeysHandler } from "../components/InputEntry/utils/actionKeysHandler";
import { getGame } from "../services/gameSession";
import { validateInputEntry } from "../validation/validateInputEntry";

type CursorPosition = { row: number; col: number };
const defaultCursorPosition: CursorPosition = { row: 1, col: 1 };

const ReturnKeys = [NAV_KEYS.RETURN, NAV_KEYS.SPACE] as const;

const BOARD_ROWS = 3;
const BOARD_COLS = 3;

const getIndexFromCursor = (pos: CursorPosition) =>
  pos.row * BOARD_COLS + pos.col;

const getCursorFromIndex = (
  index: number | string | null,
): CursorPosition | null => {
  if (index == null || typeof index === "string") return null;
  return {
    row: Math.floor(index / BOARD_COLS),
    col: index % BOARD_COLS,
  };
};

const nextPosition = (current: CursorPosition, direction: NavKey) => {
  let newRow = current.row;
  let newCol = current.col;

  switch (direction) {
    case NAV_KEYS.UP:
      newRow = (current.row - 1 + BOARD_ROWS) % BOARD_ROWS;
      break;
    case NAV_KEYS.DOWN:
      newRow = (current.row + 1) % BOARD_ROWS;
      break;
    case NAV_KEYS.LEFT:
      newCol = (current.col - 1 + BOARD_COLS) % BOARD_COLS;
      break;
    case NAV_KEYS.RIGHT:
      newCol = (current.col + 1) % BOARD_COLS;
      break;
  }

  return getIndexFromCursor({ row: newRow, col: newCol });
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

  const currentPos = getCursorFromIndex(position) ?? defaultCursorPosition;
  const nextPos = nextPosition(currentPos, key.name);

  const enterPressed = enterKeyHandler(nextPos, key, handler);
  if (enterPressed) return enterPressed;

  const actionKey = actionKeysHandler(key.name);
  if (actionKey) return actionKey;

  return nextPos;
};
