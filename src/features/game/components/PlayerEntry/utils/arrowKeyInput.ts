import type readline from "readline";

import { KeyHandler } from "@/components/KeyHandler/KeyHandler";
import { NAV_KEYS } from "@/global/navigationKeys";
import { restoreCursor, clearDown } from "@/utils/viewUtils";

import { Board } from "../../Board";

interface CursorPosition {
  row: number;
  col: number;
}

const BOARD_ROWS = 3;
const BOARD_COLS = 3;

export const arrowKeyInput = async (): Promise<number | "quit"> => {
  let cursor: CursorPosition = { row: 1, col: 1 };

  const getIndexFromCursor = (pos: CursorPosition): number => {
    return pos.row * BOARD_COLS + pos.col;
  };

  const renderWithSelection = () => {
    restoreCursor();
    clearDown();
    Board(getIndexFromCursor(cursor));
  };

  return new Promise((resolve) => {
    const handler = new KeyHandler({
      onKeyPress: (key: readline.Key) => {
        // Q - wyjście
        if (key.name === NAV_KEYS.Q) {
          handler.stop();
          resolve("quit");
          return;
        }

        // Enter lub Space - zatwierdzenie
        if (key.name === NAV_KEYS.RETURN || key.name === NAV_KEYS.SPACE) {
          handler.stop();
          resolve(getIndexFromCursor(cursor) + 1);
          return;
        }

        // Strzałki - ruch kursora
        let newRow = cursor.row;
        let newCol = cursor.col;

        switch (key.name) {
          case NAV_KEYS.UP:
            newRow = (cursor.row - 1 + BOARD_ROWS) % BOARD_ROWS;
            break;
          case NAV_KEYS.DOWN:
            newRow = (cursor.row + 1) % BOARD_ROWS;
            break;
          case NAV_KEYS.LEFT:
            newCol = (cursor.col - 1 + BOARD_COLS) % BOARD_COLS;
            break;
          case NAV_KEYS.RIGHT:
            newCol = (cursor.col + 1) % BOARD_COLS;
            break;
          default:
            return;
        }

        cursor = { row: newRow, col: newCol };
        renderWithSelection();
      },
    });

    handler.start();
  });
};
