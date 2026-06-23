import type { KeyCommand } from "@/services/navigationService";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

import { executeSettingsOption } from "../../options";

export class ToggleSelectedSettingCommand implements KeyCommand {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.ENTER;
  }

  execute(position: number): number {
    executeSettingsOption(position);
    return position;
  }
}
