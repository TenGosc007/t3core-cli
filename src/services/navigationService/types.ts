import type { NavKey } from "@/global/navigationKeys";

export type NavigationStrategy<T> = {
  move(position: T, key: NavKey): T;
};

export type KeyCommand<T> = {
  canHandle(key: NavKey): boolean;
  execute(position: T): T | NavKey | null;
};
