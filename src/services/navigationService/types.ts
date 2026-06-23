import type { NavKey } from "@/global/navigationKeys";

export type NavigationPosition = number;

export type NavigationResult = NavigationPosition | NavKey | null;

export type NavigationStrategy = {
  move(position: NavigationPosition, key: NavKey): NavigationPosition;
};

export type KeyCommand = {
  canHandle(key: NavKey): boolean;
  execute(position: NavigationPosition): NavigationResult;
};
