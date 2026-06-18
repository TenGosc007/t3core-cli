import { getSettings } from "@/services/settings";

import { INITIAL_SETTINGS_ID } from "../constants/settingsOptions";

export const activeSettingsItemHelper = (
  activeItem: number | string | null,
) => {
  const settings = getSettings();
  if (settings.arrowKeyNavigation) {
    return activeItem ?? INITIAL_SETTINGS_ID;
  }
  return null;
};
