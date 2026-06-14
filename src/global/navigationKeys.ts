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
} as const;

export type NavKey = (typeof NAV_KEYS)[keyof typeof NAV_KEYS];

const ARROW_KEYS: readonly string[] = [
  NAV_KEYS.UP,
  NAV_KEYS.DOWN,
  NAV_KEYS.LEFT,
  NAV_KEYS.RIGHT,
];
const ACTION_KEYS: readonly string[] = [
  NAV_KEYS.RETURN,
  NAV_KEYS.SPACE,
  NAV_KEYS.ESCAPE,
  NAV_KEYS.BACKSPACE,
  NAV_KEYS.DELETE,
  NAV_KEYS.TAB,
];

export const isArrowKey = (keyName: string): boolean => {
  return ARROW_KEYS.includes(keyName);
};

export const isActionKey = (keyName: string): boolean => {
  return ACTION_KEYS.includes(keyName);
};
