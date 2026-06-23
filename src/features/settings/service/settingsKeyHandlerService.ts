import { KeyHandler } from "@/services/keyHandlerService";
import { getSettings } from "@/services/settings";

import { settingsNavigation } from "../navigation/settingsNavigation";
import { INITIAL_SETTINGS_ID } from "../options";

const handler = new KeyHandler({
  onKeyPress: settingsNavigation.handleKey,
  initialPosition: INITIAL_SETTINGS_ID,
});

const getKeyHandler = () => {
  const settings = getSettings();
  if (settings.arrowKeyNavigation) handler.start();
  else handler.stop();

  return handler;
};

const stopKeyHandler = () => {
  handler.stop();
};

export const settingsKeyHandlerService = {
  get: getKeyHandler,
  stop: stopKeyHandler,
};
