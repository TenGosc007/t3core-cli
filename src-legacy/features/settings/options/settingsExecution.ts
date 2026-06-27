import type { SettingsKey, SettingsManager } from "@/services/settings";

import { settingsManager } from "@/services/settings";

import {
  getSettingsOptionById,
  getSettingsOptionByPosition,
  type SettingsOption,
} from "./settingsOptions";

const executeOption = (
  option: SettingsOption | null,
  manager: SettingsManager,
) => {
  const settings = manager.getRuntimeSettings();

  if (!option || option.disabled?.(settings)) return false;

  if (option.type === "command") {
    manager.resetSettings();
    return true;
  }

  const toggleActions: Record<SettingsKey, () => void> = {
    beep: manager.toggleBeep,
    style: manager.toggleStyle,
    arrowKeyNavigation: manager.toggleArrowKeyNavigation,
  };

  toggleActions[option.key]();
  return true;
};

export const executeSettingsOption = (
  id: number | string | null,
  manager: SettingsManager = settingsManager,
) => {
  return executeOption(getSettingsOptionById(id), manager);
};

export const executeSettingsOptionByPosition = (
  position: number | null,
  manager: SettingsManager = settingsManager,
) => {
  return executeOption(getSettingsOptionByPosition(position), manager);
};
