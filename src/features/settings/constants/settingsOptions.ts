import { isTTYAvailable } from "@/global/tty.global";
import {
  getSettings,
  resetSettings,
  toggleArrowKeyNavigation,
  toggleBeep,
  toggleStyle,
  type Settings,
  type SettingsKey,
} from "@/services/settings/settings";

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
  { id: 1, label: "Sound", type: "toggle", key: "beep", action: toggleBeep },
  { id: 2, label: "Style", type: "toggle", key: "style", action: toggleStyle },
  {
    id: 3,
    label: "Use Arrow Keys",
    type: "toggle",
    key: "arrowKeyNavigation",
    action: toggleArrowKeyNavigation,
    disabled: (settings) => !isTTYAvailable || !settings.style,
  },
  {
    id: 4,
    label: "Reset to default",
    type: "command",
    action: resetSettings,
    emphasis: true,
  },
] as const;

export const INITIAL_SETTINGS_ID = SETTINGS_OPTIONS[0].id;

export const getSettingsOptionById = (id: number | string | null | undefined) =>
  SETTINGS_OPTIONS.find((option) => option.id.toString() === id?.toString());

export const executeSettingsOption = (
  id: number | string | null | undefined,
) => {
  const option = getSettingsOptionById(id);
  const settings = getSettings();

  if (!option || option.disabled?.(settings)) return;

  option.action();
};
