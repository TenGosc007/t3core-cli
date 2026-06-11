import type { AppRoute } from "../navigation/routes";

import { Header } from "../components/Header";
import { SettingsEntry } from "../features/settings/components/SettingsEntry";
import { SettingsHeader } from "../features/settings/components/SettingsHeader";
import { SettingsOptions } from "../features/settings/components/SettingsOptions";
import { ROUTES } from "../navigation/routes";
import { beepAndClear } from "../utils/beepAndClear";

export const SettingsScreen = async (): Promise<AppRoute> => {
  while (true) {
    beepAndClear();
    Header();
    SettingsHeader();
    SettingsOptions();

    const result = await SettingsEntry();
    if (result === "quit") return ROUTES.MENU;
  }
};
