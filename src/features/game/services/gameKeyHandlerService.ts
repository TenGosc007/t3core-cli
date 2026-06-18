import { refreshInput } from "@/services/inputService";
import { KeyHandler } from "@/services/keyHandlerService";
import { getSettings } from "@/services/settings";

import { INITIAL_BOARD_POSITION } from "../constants/game.constants";
import { gameKeyHandler } from "../util/gameKeyHandler";

const handler = new KeyHandler({
  onKeyPress: gameKeyHandler,
  initialPosition: INITIAL_BOARD_POSITION,
});

const getKeyHandler = () => {
  const settings = getSettings();
  if (settings.arrowKeyNavigation) handler.start();
  else handler.stop();

  return handler;
};

const stopKeyHandler = () => {
  handler.stop();
  refreshInput();
};

export const gameKeyHandlerService = {
  get: getKeyHandler,
  stop: stopKeyHandler,
};
