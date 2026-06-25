import type { GameManager } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";
import type { SettingsManager } from "@/services/settings";

import { INITIAL_BOARD_POSITION } from "@/features/game/constants/game.constants";
import { gameManager } from "@/features/game/engine";
import { gameNavigation } from "@/features/game/navigation/gameNavigation";
import { gameStateManager } from "@/features/game/services/gameState";
import { KeyHandler } from "@/services/keyHandlerService";
import { settingsManager } from "@/services/settings";

type CreateGameKeyHandlerServiceProps = {
  settingsManager?: SettingsManager;
  gameStateManager?: GameStateManager;
  manager?: GameManager;
};

export type GameKeyHandlerService = ReturnType<
  typeof createGameKeyHandlerService
>;

export const createGameKeyHandlerService = ({
  settingsManager: settings = settingsManager,
  gameStateManager: gameState = gameStateManager,
  manager = gameManager,
}: CreateGameKeyHandlerServiceProps = {}) => {
  const handler = new KeyHandler({
    onKeyPress: gameNavigation({ manager, gameState }).handleKey,
    initialPosition: INITIAL_BOARD_POSITION,
  });

  const get = () => {
    const runtimeSettings = settings.getRuntimeSettings();
    const isHistoryModeOn = gameState.historyMode;

    if (runtimeSettings.arrowKeyNavigation && !isHistoryModeOn) handler.start();
    else handler.stop();

    return handler;
  };

  const stop = () => {
    handler.stop();
  };

  return { get, stop };
};
