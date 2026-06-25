import type { SettingsManager } from "@/services/settings";

import { settingsNavigation } from "@/features/settings/navigation/settingsNavigation";
import { INITIAL_SETTINGS_POSITION } from "@/features/settings/options";
import { KeyHandler } from "@/services/keyHandlerService";
import { settingsManager } from "@/services/settings";

type CreateSettingsKeyHandlerServiceProps = {
  settingsManager?: SettingsManager;
};

export type SettingsKeyHandlerService = ReturnType<
  typeof createSettingsKeyHandlerService
>;

export const createSettingsKeyHandlerService = ({
  settingsManager: manager = settingsManager,
}: CreateSettingsKeyHandlerServiceProps = {}) => {
  const handler = new KeyHandler({
    onKeyPress: settingsNavigation({ settingsManager: manager }).handleKey,
    initialPosition: INITIAL_SETTINGS_POSITION,
  });

  const getSyncedHandler = () => {
    const settings = manager.getRuntimeSettings();
    if (settings.arrowKeyNavigation) handler.start();
    else handler.stop();

    return handler;
  };

  const stop = () => {
    handler.stop();
  };

  return { getSyncedHandler, stop };
};
