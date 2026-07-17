export const BOARD_ROWS = 3;
export const BOARD_COLS = 3;

export const BORDER_CHARS = {
  top: { left: "┌", mid: "┬", right: "┐" },
  mid: { left: "├", mid: "┼", right: "┤" },
  bot: { left: "└", mid: "┴", right: "┘" },
} as const;
