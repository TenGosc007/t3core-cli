import type { AppRoute } from "@/navigation/routes";

import { SettingsEntry } from "./components/SettingsEntry";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsOptions } from "./components/SettingsOptions";

export const SettingsView = async (): Promise<AppRoute> => {
  SettingsHeader();
  SettingsOptions();
  return await SettingsEntry();
};
