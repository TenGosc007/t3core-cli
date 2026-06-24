import type { GameManager } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";
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
import { gameStateManager } from "@/features/game/services/gameState";
import {
  GridNavigationStrategy,
  NavigationController,
  QuitCommand,
} from "@/services/navigationService";

const gridNavigationStrategy = new GridNavigationStrategy(
  BOARD_ROWS,
  BOARD_COLS,
);

type OnQuitProps = {
  game?: GameManager;
  gameState?: GameStateManager;
};

const onQuit = ({ game, gameState }: OnQuitProps) => {
  const resolvedGame = game ?? gameManager;
  const resolvedState = gameState ?? gameStateManager;
  resolvedGame.reset();
  resolvedState.reset();
};

const navigationController = new NavigationController(gridNavigationStrategy, [
  new QuitCommand(() => onQuit({})),
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
