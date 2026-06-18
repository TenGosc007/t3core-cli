import { NAV_KEYS } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { restoreAndClearDown, saveCursor } from "@/utils/viewUtils";

import { SettingsEntry } from "./components/SettingsEntry";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsHintMessage } from "./components/SettingsHintMessage";
import { SettingsOptions } from "./components/SettingsOptions";
import { INITIAL_SETTINGS_ID } from "./constants/settingsOptions";
import { settingsKeyHandlerService } from "./service/settingsKeyHanlderService";
import { activeSettingsItemHelper } from "./utils/activeSettingsItemHelper";

export const SettingsView = async (): Promise<AppRoute> => {
  saveCursor();
  SettingsHeader();

  let activeItem: number | string | null = INITIAL_SETTINGS_ID;

  while (true) {
    const keyHanlder = settingsKeyHandlerService.get();
    activeItem = activeSettingsItemHelper(activeItem);
    restoreAndClearDown();

    SettingsOptions(activeItem);
    SettingsHintMessage();

    activeItem = keyHanlder.running
      ? await keyHanlder.waitForKeyPress()
      : await SettingsEntry();

    if (activeItem === NAV_KEYS.Q) break;
  }

  settingsKeyHandlerService.stop();
  return ROUTES.MENU;
};
