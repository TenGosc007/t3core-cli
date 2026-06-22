import type { NavigationStrategy } from "../types";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

export class ListNavigationStrategy implements NavigationStrategy<number> {
  constructor(
    private readonly min: number,
    private readonly max: number,
  ) {}

  move(position: number, key: NavKey): number {
    if (key === NAV_KEYS.UP) return Math.max(this.min, position - 1);
    if (key === NAV_KEYS.DOWN) return Math.min(this.max, position + 1);

    return position;
  }
}
