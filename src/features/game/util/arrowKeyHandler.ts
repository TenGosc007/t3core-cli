import type { NavKey } from "@/global/navigationKeys";
import type { KeyHandlerProps } from "@/services/keyHandlerService";

import { NAV_KEYS } from "@/global/navigationKeys";
import { ROUTES } from "@/navigation/routes";

import { getGame } from "../services/gameSession";
import { gameState } from "../services/gameState";
import { validateInputEntry } from "../validation/validateInputEntry";

type CursorPosition = { row: number; col: number };
const defaultCursorPosition: CursorPosition = { row: 1, col: 1 };

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

const ReturnKeys = [NAV_KEYS.RETURN, NAV_KEYS.SPACE] as const;
const QuitKeys = [NAV_KEYS.Q, NAV_KEYS.ESCAPE, NAV_KEYS.BACKSPACE] as const;

export const arrowKeyHandler = (props: KeyHandlerProps) => {
  const { key, position, handler } = props;
  if (!key.name) return null;

  const game = getGame();

  const currentPos = getCursorFromIndex(position) ?? defaultCursorPosition;
  const nextPos = nextPosition(currentPos, key.name);

  if (ReturnKeys.some((k) => k === key.name)) {
    if (game.gameStatus.status !== "running") {
      game.reset();
      handler.resetPosition();
      return handler.initialPosition;
    }

    gameState.inputError = null;
    validateInputEntry(nextPos);
    game.savePlayerMove(nextPos);
    return nextPos;
  }

  if (QuitKeys.some((k) => k === key.name)) {
    handler.stop();
    game.reset();
    return ROUTES.MENU;
  }

  if (key.name === NAV_KEYS.H && game.movesCount > 0) {
    gameState.toggleState("historyMode");
    return null;
  }

  if (key.name === NAV_KEYS.I) {
    gameState.toggleState("info");
    return null;
  }

  return nextPos;
};
