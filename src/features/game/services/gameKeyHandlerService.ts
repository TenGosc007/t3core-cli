import { INITIAL_BOARD_POSITION } from "@/features/game/constants/game.constants";
import { gameNavigation } from "@/features/game/navigation/gameNavigation";
import { KeyHandler } from "@/services/keyHandlerService";
import { settingsManager } from "@/services/settings";

import { gameStateManager } from "./gameState";

const handler = new KeyHandler({
  onKeyPress: gameNavigation().handleKey,
  initialPosition: INITIAL_BOARD_POSITION,
});

const getKeyHandler = () => {
  const settings = settingsManager.getRuntimeSettings();
  const isHistoryModeOn = gameStateManager.historyMode;

  if (settings.arrowKeyNavigation && !isHistoryModeOn) handler.start();
  else stopKeyHandler();

  return handler;
};

const stopKeyHandler = () => {
  handler.stop();
};

export const gameKeyHandlerService = {
  get: getKeyHandler,
  stop: stopKeyHandler,
};
