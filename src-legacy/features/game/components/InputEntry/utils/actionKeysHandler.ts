import type { GameManager } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { gameManager } from "@/features/game/engine";
import { ToggleHistoryCommand } from "@/features/game/navigation/commands/toggleHistoryCommand";
import { ToggleInfoCommand } from "@/features/game/navigation/commands/toggleInfoCommand";
import { gameStateManager } from "@/features/game/services/gameState";
import { type NavKey } from "@/global/navigationKeys";
import { QuitCommand } from "@/services/navigationService";

type ActionKeysHandlerProps = {
  key: string | null;
  manager?: GameManager;
  gameState?: GameStateManager;
};

export const actionKeysHandler = ({
  key,
  manager = gameManager,
  gameState = gameStateManager,
}: ActionKeysHandlerProps): NavKey | null => {
  if (key == null) return null;

  const quitCommand = new QuitCommand(() => {
    manager.reset();
    gameState.reset();
  });
  const toggleHistoryCommand = new ToggleHistoryCommand(
    manager.getGame(),
    gameState,
  );
  const toggleInfoCommand = new ToggleInfoCommand(gameState);

  if (quitCommand.canHandle(key as NavKey)) {
    return quitCommand.execute();
  }

  if (toggleHistoryCommand.canHandle(key as NavKey)) {
    return toggleHistoryCommand.execute();
  }

  if (toggleInfoCommand.canHandle(key as NavKey)) {
    return toggleInfoCommand.execute();
  }

  return null;
};
