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

export const KNOWN_NAV_KEYS_SET: ReadonlySet<string> = new Set([
  NAV_KEYS.UP,
  NAV_KEYS.DOWN,
  NAV_KEYS.LEFT,
  NAV_KEYS.RIGHT,
  NAV_KEYS.RETURN,
  NAV_KEYS.SPACE,
  NAV_KEYS.ESCAPE,
  NAV_KEYS.BACKSPACE,
  NAV_KEYS.DELETE,
  NAV_KEYS.TAB,
  NAV_KEYS.Q,
  NAV_KEYS.H,
  NAV_KEYS.I,
  NAV_KEYS.C,
]);

export type NavKey = (typeof NAV_KEYS)[keyof typeof NAV_KEYS];

export const isExitKey = (key: number | string | null) => {
  return (
    key === NAV_KEYS.Q || key === NAV_KEYS.ESCAPE || key === NAV_KEYS.BACKSPACE
  );
};
