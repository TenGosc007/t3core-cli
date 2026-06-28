export const SETTINGS_KEYS = {
  beep: "beep",
  arrowKeyNavigation: "arrowKeyNavigation",
} as const;

export type SettingsKey = keyof typeof SETTINGS_KEYS;

export type SettingsState = Record<SettingsKey, boolean>;

export const DEFAULT_SETTINGS: SettingsState = {
  [SETTINGS_KEYS.beep]: true,
  [SETTINGS_KEYS.arrowKeyNavigation]: true,
};

type BaseSettingsOption = {
  id: number;
  label: string;
  emphasis?: boolean;
  disabled?: (settings: SettingsState) => boolean;
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
  },
  {
    id: 2,
    label: "Use Arrow Keys",
    type: "toggle",
    key: "arrowKeyNavigation",
  },
  {
    id: 3,
    label: "Reset to default",
    type: "command",
  },
  {
    id: 4,
    label: "Back to Menu",
    type: "command",
    emphasis: true,
  },
];
