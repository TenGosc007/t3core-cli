import type { KeyCommand } from "@/services/navigationService/types";

import { isExitKey, NAV_KEYS, type NavKey } from "@/global/navigationKeys";

export class QuitCommand implements KeyCommand {
  constructor(private readonly onQuit?: () => void) {}

  canHandle(key: NavKey): boolean {
    return isExitKey(key);
  }

  execute(): NavKey {
    this.onQuit?.();
    return NAV_KEYS.Q;
  }
}
