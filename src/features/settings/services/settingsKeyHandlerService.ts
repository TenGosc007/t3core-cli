import { settingsNavigation } from "@/features/settings/navigation/settingsNavigation";
import { INITIAL_SETTINGS_POSITION } from "@/features/settings/options";
import { KeyHandler } from "@/services/keyHandlerService";
import { settingsManager } from "@/services/settings";

const handler = new KeyHandler({
  onKeyPress: settingsNavigation.handleKey,
  initialPosition: INITIAL_SETTINGS_POSITION,
});

const getSyncedKeyHandler = () => {
  const settings = settingsManager.getRuntimeSettings();
  if (settings.arrowKeyNavigation) handler.start();
  else handler.stop();

  return handler;
};

const stopKeyHandler = () => {
  handler.stop();
};

export const settingsKeyHandlerService = {
  getSyncedHandler: getSyncedKeyHandler,
  stop: stopKeyHandler,
};
