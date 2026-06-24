import type { KeyHandlerProps } from "@/services/keyHandlerService";

import {
  BOARD_COLS,
  BOARD_ROWS,
  INITIAL_BOARD_POSITION,
} from "@/features/game/constants/game.constants";
import { gameManager } from "@/features/game/engine";
import { SelectFieldCommand } from "@/features/game/navigation/commands/selectFieldCommand";
import { ToggleHistoryCommand } from "@/features/game/navigation/commands/toggleHistoryCommand";
import { ToggleInfoCommand } from "@/features/game/navigation/commands/toggleInfoCommand";
import { gameState } from "@/features/game/services/gameState";
import {
  GridNavigationStrategy,
  NavigationController,
  QuitCommand,
} from "@/services/navigationService";

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
