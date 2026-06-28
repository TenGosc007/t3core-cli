export type SettingsState = {
  beep: boolean;
  style: boolean;
  arrowKeyNavigation: boolean;
};

export type SettingsOption = {
  id: number;
  label: string;
  type: "toggle" | "command";
  key?: keyof SettingsState;
  emphasis?: boolean;
  disabled?: (settings: SettingsState) => boolean;
};

export const SETTINGS_OPTIONS: readonly SettingsOption[] = [
  {
    id: 1,
    label: "Sound",
    type: "toggle",
    key: "beep",
  },
  {
    id: 2,
    label: "Style",
    type: "toggle",
    key: "style",
  },
  {
    id: 3,
    label: "Use Arrow Keys",
    type: "toggle",
    key: "arrowKeyNavigation",
    disabled: (settings) => !settings.style,
  },
  {
    id: 4,
    label: "Reset to default",
    type: "command",
    emphasis: true,
  },
  {
    id: 5,
    label: "Back to Menu",
    type: "command",
  },
];

export const DEFAULT_SETTINGS: SettingsState = {
  beep: true,
  style: true,
  arrowKeyNavigation: true,
};
