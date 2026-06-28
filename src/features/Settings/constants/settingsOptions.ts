export type SettingsState = {
  beep: boolean;
  arrowKeyNavigation: boolean;
};

type BaseSettingsOption = {
  id: number;
  label: string;
  emphasis?: boolean;
  disabled?: (settings: SettingsState) => boolean;
};

type ToggleSettingsOption = BaseSettingsOption & {
  type: "toggle";
  key: "beep" | "arrowKeyNavigation";
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
    emphasis: true,
  },
  {
    id: 4,
    label: "Back to Menu",
    type: "command",
  },
];

export const DEFAULT_SETTINGS: SettingsState = {
  beep: true,
  arrowKeyNavigation: true,
};
