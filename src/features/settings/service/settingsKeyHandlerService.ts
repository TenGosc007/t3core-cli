import { KeyHandler } from "@/services/keyHandlerService";
import { getRuntimeSettings } from "@/services/settings";

import { settingsNavigation } from "../navigation/settingsNavigation";
import { INITIAL_SETTINGS_POSITION } from "../options";

const handler = new KeyHandler({
  onKeyPress: settingsNavigation.handleKey,
  initialPosition: INITIAL_SETTINGS_POSITION,
});

const getKeyHandler = () => {
  const settings = getRuntimeSettings();
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
