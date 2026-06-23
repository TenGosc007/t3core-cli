import { KeyHandler } from "@/services/keyHandlerService";
import { getSettings } from "@/services/settings";

import { INITIAL_BOARD_POSITION } from "../constants/game.constants";
import { gameNavigation } from "../navigation/gameNavigation";
import { gameState } from "./gameState";

const handler = new KeyHandler({
  onKeyPress: gameNavigation.handleKey,
  initialPosition: INITIAL_BOARD_POSITION,
});

const getKeyHandler = () => {
  const settings = getSettings();
  const isHistoryModeOn = gameState.historyMode;

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
