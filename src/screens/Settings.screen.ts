import type { AppRoute } from "../navigation/routes";

import { SettingsView } from "../features/settings/settings";

export const SettingsScreen = async (): Promise<AppRoute> => {
  return SettingsView();
};
