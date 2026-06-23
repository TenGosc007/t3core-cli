import { isExitKey } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { restoreAndClearDown, saveCursor } from "@/utils/viewUtils";

import { SettingsEntry } from "./components/SettingsEntry";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsHintMessage } from "./components/SettingsHintMessage";
import { SettingsOptions } from "./components/SettingsOptions";
import { settingsKeyHandlerService } from "./service/settingsKeyHandlerService";

export const SettingsView = async (): Promise<AppRoute> => {
  SettingsHeader();
  saveCursor();

  while (true) {
    const keyHandler = settingsKeyHandlerService.getSyncedHandler();
    restoreAndClearDown();

    SettingsOptions(keyHandler.position);
    SettingsHintMessage();

    const key = keyHandler.running
      ? await keyHandler.waitForKeyPress()
      : await SettingsEntry();

    if (isExitKey(key)) break;
  }

  settingsKeyHandlerService.stop();
  return ROUTES.MENU;
};
