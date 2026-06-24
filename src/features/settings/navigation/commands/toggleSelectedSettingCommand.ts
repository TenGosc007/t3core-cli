import type { KeyCommand } from "@/services/navigationService";

import { executeSettingsOptionByPosition } from "@/features/settings/options";
import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

export class ToggleSelectedSettingCommand implements KeyCommand {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.ENTER;
  }

  execute(position: number): number {
    executeSettingsOptionByPosition(position);
    return position;
  }
}
