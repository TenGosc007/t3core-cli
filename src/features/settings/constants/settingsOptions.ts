import {
  resetSettings,
  toggleArrowKeyNavigation,
  toggleBeep,
  toggleStyle,
  type SettingsKey,
} from "@/services/settings/settings";

export type SettingsOption = {
  id: string;
  label: string;
  key: SettingsKey;
  action?: () => void;
};

export const SETTINGS_OPTIONS: SettingsOption[] = [
  { id: "1", label: "Sound", key: "beep", action: toggleBeep },
  { id: "2", label: "Style", key: "style", action: toggleStyle },
  {
    id: "3",
    label: "Use Arrow Keys",
    key: "arrowKeyNavigation",
    action: toggleArrowKeyNavigation,
  },
  { id: "4", label: "Reset to default", key: "reset", action: resetSettings },
] as const;

export const INITIAL_SETTINGS_ID = 1;
