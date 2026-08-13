import type { Key } from "ink";

import { wrapIndex } from "@/features/Menu/hooks/useMenuInput/handleMenuInput";

export type SettingsInputResult =
  | { type: "noop" }
  | { type: "navigate"; direction: "up" | "down" }
  | { type: "select" };

export const handleSettingsInput = (
  key: Key,
  isActive: boolean,
): SettingsInputResult => {
  if (!isActive) return { type: "noop" };
  if (key.upArrow) return { type: "navigate", direction: "up" };
  if (key.downArrow) return { type: "navigate", direction: "down" };
  if (key.return) return { type: "select" };
  return { type: "noop" };
};

export { wrapIndex };
