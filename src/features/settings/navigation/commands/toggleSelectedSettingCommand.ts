import type { KeyCommand } from "@/services/navigationService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";
import {
  resetSettings,
  toggleArrowKeyNavigation,
  toggleBeep,
  toggleStyle,
} from "@/services/settings";

const SettingsActions: Record<number, () => void> = {
  1: toggleBeep,
  2: toggleStyle,
  3: toggleArrowKeyNavigation,
  4: resetSettings,
};

export class ToggleSelectedSettingCommand implements KeyCommand<number> {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.ENTER;
  }

  execute(position: number): number {
    SettingsActions[position]?.();
    return position;
  }
}
