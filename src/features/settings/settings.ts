import type { SettingsManager } from "@/services/settings";

import { SettingsEntry } from "@/features/settings/components/SettingsEntry";
import { SettingsHeader } from "@/features/settings/components/SettingsHeader";
import { SettingsHintMessage } from "@/features/settings/components/SettingsHintMessage";
import { SettingsOptions } from "@/features/settings/components/SettingsOptions";
import { SETTINGS_OPTIONS } from "@/features/settings/options";
import {
  createSettingsKeyHandlerService,
  type SettingsKeyHandlerService,
} from "@/features/settings/services/settingsKeyHandlerService";
import { isExitKey } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { settingsManager } from "@/services/settings";
import { restoreAndClearDown, saveCursor } from "@/utils/viewUtils";

type SettingsViewProps = {
  settingsManager?: SettingsManager;
  settingsKeyHandlerService?: SettingsKeyHandlerService;
};

export const SettingsView = async ({
  settingsManager: manager = settingsManager,
  settingsKeyHandlerService,
}: SettingsViewProps = {}): Promise<AppRoute> => {
  const keyHandlerService =
    settingsKeyHandlerService ??
    createSettingsKeyHandlerService({ settingsManager: manager });

  SettingsHeader();
  saveCursor();

  while (true) {
    const keyHandler = keyHandlerService.getSyncedHandler();
    restoreAndClearDown();

    SettingsOptions({
      options: SETTINGS_OPTIONS,
      settings: manager.getRuntimeSettings(),
      activePosition: keyHandler.position,
    });
    SettingsHintMessage();

    const key = keyHandler.running
      ? await keyHandler.waitForKeyPress()
      : await SettingsEntry();

    if (isExitKey(key)) break;
  }

  keyHandlerService.stop();
  return ROUTES.MENU;
};
