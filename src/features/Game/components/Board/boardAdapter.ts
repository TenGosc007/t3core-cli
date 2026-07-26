import type { BoardField } from "../../engine/gameEngine";

import {
  BOARD_SIZE,
  BOARD_SIZE,
} from "@/features/Game/constants/gameConstants";

export type CellViewModel = {
  index: number;
  value: BoardField;
  isSelected: boolean;
};

export const toGrid = (
  board: readonly BoardField[],
  selectedCell: number,
): CellViewModel[][] =>
  Array.from({ length: BOARD_SIZE }, (_, row) =>
    Array.from({ length: BOARD_SIZE }, (_, col) => {
      const index = row * BOARD_SIZE + col;
      return {
        index,
        value: board[index],
        isSelected: index === selectedCell,
      };
    }),
  );
