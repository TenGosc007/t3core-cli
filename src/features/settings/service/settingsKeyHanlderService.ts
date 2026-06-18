import { refreshInput } from "@/services/inputService";
import { KeyHandler } from "@/services/keyHandlerService";
import { getSettings } from "@/services/settings";

import { INITIAL_SETTINGS_ID } from "../constants/settingsOptions";
import { settingsKeyHandler } from "../utils/settingsKeyHandler";

const handler = new KeyHandler({
  onKeyPress: settingsKeyHandler,
  initialPosition: INITIAL_SETTINGS_ID,
});

const getKeyHandler = () => {
  const settings = getSettings();
  if (settings.arrowKeyNavigation) handler.start();
  else handler.stop();

  return handler;
};

const stopSettingsKeyHandler = () => {
  handler.stop();
  refreshInput();
};

export const settingsKeyHandlerService = {
  get: getKeyHandler,
  stop: stopSettingsKeyHandler,
};
