import type { Key } from "ink";

export type ArrowNavInputResult =
  | { type: "noop" }
  | { type: "navigate"; direction: "up" | "down" }
  | { type: "select" };

export const wrapIndex = (
  index: number,
  length: number,
  direction: "up" | "down",
): number =>
  direction === "up" ? (index - 1 + length) % length : (index + 1) % length;

export const handleArrowNavInput = (
  key: Key,
  isActive: boolean,
): ArrowNavInputResult => {
  if (!isActive) return { type: "noop" };
  if (key.upArrow) return { type: "navigate", direction: "up" };
  if (key.downArrow) return { type: "navigate", direction: "down" };
  if (key.return) return { type: "select" };
  return { type: "noop" };
};
