export const NAV_KEYS = {
  // Arrows
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",

  // Actions
  RETURN: "return",
  ENTER: "return", // alias
  SPACE: "space",
  ESCAPE: "escape",
  BACKSPACE: "backspace",
  DELETE: "delete",

  // Text navigation
  TAB: "tab",

  // Special
  Q: "q",
  H: "h",
  I: "i",
  C: "c",
} as const;

export type NavKey = (typeof NAV_KEYS)[keyof typeof NAV_KEYS];
