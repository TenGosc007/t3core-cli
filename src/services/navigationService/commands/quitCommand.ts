import type { KeyCommand } from "../types";

import { isExitKey, NAV_KEYS, type NavKey } from "@/global/navigationKeys";

export class QuitCommand<TPosition> implements KeyCommand<TPosition> {
  constructor(private readonly onQuit?: () => void) {}

  canHandle(key: NavKey): boolean {
    return isExitKey(key);
  }

  execute(): NavKey {
    this.onQuit?.();
    return NAV_KEYS.Q;
  }
}
