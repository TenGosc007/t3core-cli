import { isExitKey } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { restoreAndClearDown, saveCursor } from "@/utils/viewUtils";

import { SettingsEntry } from "./components/SettingsEntry";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsHintMessage } from "./components/SettingsHintMessage";
import { SettingsOptions } from "./components/SettingsOptions";
import { settingsKeyHandlerService } from "./service/settingsKeyHanlderService";

export const SettingsView = async (): Promise<AppRoute> => {
  saveCursor();
  SettingsHeader();

  while (true) {
    const keyHanlder = settingsKeyHandlerService.get();
    restoreAndClearDown();

    SettingsOptions(keyHanlder.position);
    SettingsHintMessage();

    const key = keyHanlder.running
      ? await keyHanlder.waitForKeyPress()
      : await SettingsEntry();

    if (isExitKey(key)) break;
  }

  settingsKeyHandlerService.stop();
  return ROUTES.MENU;
};
