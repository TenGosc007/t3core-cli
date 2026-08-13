import type {
  SettingsKey,
  SettingsOption,
  SettingsState,
} from "../../constants/settingsOptions";

import { ROUTES } from "@/navigation";

export type SettingsCommands = {
  toggle: (key: SettingsKey) => void;
  reset: () => void;
  navigate: (path: (typeof ROUTES)[keyof typeof ROUTES]) => void;
};

export const handleSettingsOption = (
  option: SettingsOption | undefined,
  settings: SettingsState,
  commands: SettingsCommands,
) => {
  if (!option || option.disabled?.(settings)) return;

  if (option.type === "command") {
    if (option.command === "back") return commands.navigate(ROUTES.home);
    return commands.reset();
  }

  commands.toggle(option.key);
};
