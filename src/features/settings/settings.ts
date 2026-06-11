import type { AppRoute } from "@/navigation/routes";

import { Header } from "@/components/Header";
import { ROUTES } from "@/navigation/routes";
import { beepAndClear } from "@/utils/beepAndClear";

import { SettingsEntry } from "./components/SettingsEntry";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsOptions } from "./components/SettingsOptions";

export const SettingsView = async (): Promise<AppRoute> => {
  while (true) {
    beepAndClear();
    Header();
    SettingsHeader();
    SettingsOptions();

    const result = await SettingsEntry();
    if (result === "quit") return ROUTES.MENU;
  }
};
