import type { KeyHandlerProps } from "@/services/keyHandlerService";

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
import { gameManager } from "../engine";
import { gameState } from "../services/gameState";
import { SelectFieldCommand } from "./commands/selectFieldCommand";
import { ToggleHistoryCommand } from "./commands/toggleHistoryCommand";
import { ToggleInfoCommand } from "./commands/toggleInfoCommand";

const gridNavigationStrategy = new GridNavigationStrategy(
  BOARD_ROWS,
  BOARD_COLS,
);

const onQuit = () => {
  gameManager.reset();
  gameState.reset();
};

const navigationController = new NavigationController(gridNavigationStrategy, [
  new QuitCommand(onQuit),
  new SelectFieldCommand(),
  new ToggleHistoryCommand(),
  new ToggleInfoCommand(),
]);

const handleKey = ({ key, position }: KeyHandlerProps) => {
  const currentPos = position ?? INITIAL_BOARD_POSITION;
  return navigationController.handleKey(currentPos, key.name);
};

export const gameNavigation = {
  handleKey,
};
