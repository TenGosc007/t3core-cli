import { SettingsEntry } from "@/features/settings/components/SettingsEntry";
import { SettingsHeader } from "@/features/settings/components/SettingsHeader";
import { SettingsHintMessage } from "@/features/settings/components/SettingsHintMessage";
import { SettingsOptions } from "@/features/settings/components/SettingsOptions";
import { settingsKeyHandlerService } from "@/features/settings/services/settingsKeyHandlerService";
import { isExitKey } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { settingsManager } from "@/services/settings";
import { restoreAndClearDown, saveCursor } from "@/utils/viewUtils";

export const SettingsView = async (): Promise<AppRoute> => {
  const settings = settingsManager;

  SettingsHeader();
  saveCursor();

  while (true) {
    const keyHandler = settingsKeyHandlerService.getSyncedHandler();
    restoreAndClearDown();

    SettingsOptions({
      settingsManager: settings,
      activePosition: keyHandler.position,
    });
    SettingsHintMessage();

    const key = keyHandler.running
      ? await keyHandler.waitForKeyPress()
      : await SettingsEntry();

    if (isExitKey(key)) break;
  }

  settingsKeyHandlerService.stop();
  return ROUTES.MENU;
};
