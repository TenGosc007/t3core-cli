import type { NavKey } from "@/global/navigationKeys";

export type NavigationStrategy<TPosition> = {
  move(position: TPosition, key: NavKey): TPosition;
};

export type KeyCommand<TPosition> = {
  canHandle(key: NavKey): boolean;
  execute(position: TPosition): TPosition | NavKey | null;
};
