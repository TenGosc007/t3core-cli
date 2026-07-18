import type { BoardField } from "t3core";

import { BOARD_COLS, BOARD_ROWS } from "@/features/Game/constants/gameConstants";

export type CellViewModel = {
  index: number;
  value: BoardField;
  isSelected: boolean;
};

export const toGrid = (
  board: readonly BoardField[],
  selectedCell: number,
): CellViewModel[][] =>
  Array.from({ length: BOARD_ROWS }, (_, row) =>
    Array.from({ length: BOARD_COLS }, (_, col) => {
      const index = row * BOARD_COLS + col;
      return {
        index,
        value: board[index],
        isSelected: index === selectedCell,
      };
    }),
  );
