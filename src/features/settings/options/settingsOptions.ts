import { isTTYAvailable } from "@/global/tty.global";
import {
  settingsManager,
  type Settings,
  type SettingsKey,
} from "@/services/settings";

type BaseSettingsOption = {
  id: number;
  label: string;
  action: () => void;
  disabled?: (settings: Settings) => boolean;
  emphasis?: boolean;
};

type ToggleSettingsOption = BaseSettingsOption & {
  type: "toggle";
  key: SettingsKey;
};

type CommandSettingsOption = BaseSettingsOption & {
  type: "command";
};

export type SettingsOption = ToggleSettingsOption | CommandSettingsOption;

export const SETTINGS_OPTIONS: readonly SettingsOption[] = [
  {
    id: 1,
    label: "Sound",
    type: "toggle",
    key: "beep",
    action: settingsManager.toggleBeep,
  },
  {
    id: 2,
    label: "Style",
    type: "toggle",
    key: "style",
    action: settingsManager.toggleStyle,
  },
  {
    id: 3,
    label: "Use Arrow Keys",
    type: "toggle",
    key: "arrowKeyNavigation",
    action: settingsManager.toggleArrowKeyNavigation,
    disabled: (settings) => !isTTYAvailable || !settings.style,
  },
  {
    id: 4,
    label: "Reset to default",
    type: "command",
    action: settingsManager.resetSettings,
    emphasis: true,
  },
] as const;

export const INITIAL_SETTINGS_POSITION = 0;
export const LAST_SETTINGS_POSITION = SETTINGS_OPTIONS.length - 1;
export const SETTINGS_OPTION_IDS_LABEL = `${SETTINGS_OPTIONS[0].id}-${SETTINGS_OPTIONS[SETTINGS_OPTIONS.length - 1].id}`;

export const getSettingsOptionById = (id: number | string | null) =>
  SETTINGS_OPTIONS.find((option) => option.id.toString() === id?.toString()) ??
  null;

export const getSettingsOptionByPosition = (position: number | null) => {
  if (position == null) return null;
  if (!Number.isInteger(position)) return null;

  return SETTINGS_OPTIONS[position];
};

const executeOption = (option: SettingsOption | null) => {
  const settings = settingsManager.getRuntimeSettings();

  if (!option || option.disabled?.(settings)) return false;

  option.action();
  return true;
};

export const executeSettingsOption = (id: number | string | null) => {
  return executeOption(getSettingsOptionById(id));
};

export const executeSettingsOptionByPosition = (position: number | null) => {
  return executeOption(getSettingsOptionByPosition(position));
};
