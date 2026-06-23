import type { KeyHandler, ReadlineKey } from "@/services/keyHandlerService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";
import {
  GridNavigationStrategy,
  NavigationController,
} from "@/services/navigationService";

import { actionKeysHandler } from "../components/InputEntry/utils/actionKeysHandler";
import {
  BOARD_COLS,
  BOARD_ROWS,
  INITIAL_BOARD_POSITION,
} from "../constants/game.constants";
import { getGame } from "../services/gameSession";
import { validateInputEntry } from "../validation/validateInputEntry";

type GameNavigationProps = {
  handler: KeyHandler;
  key: ReadlineKey;
  position: number | string | null;
};

const ReturnKeys = [NAV_KEYS.RETURN, NAV_KEYS.SPACE] as const;

const navigationController = new NavigationController(
  INITIAL_BOARD_POSITION,
  new GridNavigationStrategy(BOARD_ROWS, BOARD_COLS),
);

const getCurrentPosition = (position: number | string | null) => {
  if (typeof position === "number") return position;
  return INITIAL_BOARD_POSITION;
};

const movePosition = (position: number, key: NavKey) => {
  navigationController.reset(position);

  const nextPosition = navigationController.handleKey(key);
  if (typeof nextPosition === "number") return nextPosition;

  return position;
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

const handleKey = ({ key, position, handler }: GameNavigationProps) => {
  if (!key.name) return null;

  const currentPos = getCurrentPosition(position);
  const nextPos = movePosition(currentPos, key.name);

  const enterPressed = enterKeyHandler(nextPos, key, handler);
  if (enterPressed !== undefined) return enterPressed;

  const actionKey = actionKeysHandler(key.name);
  if (actionKey) return actionKey;

  return nextPos;
};

export const gameNavigation = {
  handleKey,
  reset: () => navigationController.reset(INITIAL_BOARD_POSITION),
};
