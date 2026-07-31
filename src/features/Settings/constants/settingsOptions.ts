export const SETTINGS_KEYS = {
  beep: "beep",
  arrowNav: "arrowNav",
  showHistory: "showHistory",
} as const;

export type SettingsKey = keyof typeof SETTINGS_KEYS;

export type SettingsState = Record<SettingsKey, boolean>;

export const DEFAULT_SETTINGS: SettingsState = {
  [SETTINGS_KEYS.beep]: true,
  [SETTINGS_KEYS.arrowNav]: true,
  [SETTINGS_KEYS.showHistory]: false,
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
    key: "arrowNav",
  },
  {
    id: 3,
    label: "Show Game History",
    type: "toggle",
    key: "showHistory",
  },
  {
    id: 4,
    label: "Reset to default",
    type: "command",
  },
  {
    id: 5,
    label: "Back to Menu",
    type: "command",
    emphasis: true,
  },
];
