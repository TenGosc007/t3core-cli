import type { KeyCommand } from "@/services/navigationService";
import type { SettingsManager } from "@/services/settings";

import { executeSettingsOptionByPosition } from "@/features/settings/options";
import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";
import { settingsManager } from "@/services/settings";

export class ToggleSelectedSettingCommand implements KeyCommand {
  constructor(
    private readonly _settingsManager: SettingsManager = settingsManager,
  ) {}

  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.ENTER;
  }

  execute(position: number): number {
    executeSettingsOptionByPosition(position, this._settingsManager);
    return position;
  }
}
