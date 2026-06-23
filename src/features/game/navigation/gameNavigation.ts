import type { KeyHandler, KeyHandlerProps } from "@/services/keyHandlerService";

import {
  GridNavigationStrategy,
  NavigationController,
  QuitCommand,
} from "@/services/navigationService";

import {
  BOARD_COLS,
  BOARD_ROWS,
  INITIAL_BOARD_POSITION,
} from "../constants/game.constants";
import { resetGame } from "../services/gameSession";
import { gameState } from "../services/gameState";
import { SelectFieldCommand } from "./commands/selectFieldCommand";
import { ToggleHistoryCommand } from "./commands/toggleHistoryCommand";
import { ToggleInfoCommand } from "./commands/toggleInfoCommand";

const gridNavigationStrategy = new GridNavigationStrategy(
  BOARD_ROWS,
  BOARD_COLS,
);

const getCurrentPosition = (position: number | string | null) => {
  if (typeof position === "number") return position;
  return INITIAL_BOARD_POSITION;
};

const onQuit = () => {
  resetGame();
  gameState.reset();
};

let activeHandler: KeyHandler | null = null;

const navigationController = new NavigationController(gridNavigationStrategy, [
  new QuitCommand(onQuit),
  new SelectFieldCommand(() => activeHandler),
  new ToggleHistoryCommand(),
  new ToggleInfoCommand(),
]);

const handleKey = ({ key, position, handler }: KeyHandlerProps) => {
  if (!key.name) return null;

  const currentPos = getCurrentPosition(position);
  activeHandler = handler;

  try {
    const nextPosition = navigationController.handleKey(currentPos, key.name);

    if (typeof nextPosition === "number") return nextPosition;
    return nextPosition;
  } finally {
    activeHandler = null;
  }
};

export const gameNavigation = {
  handleKey,
};
