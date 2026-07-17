import type { BoardField } from "t3core";

import { Box } from "ink";

import { BoardRow } from "./components/BoardRow";
import { Border } from "./components/Border";
import { BOARD_COLS, BOARD_ROWS } from "./constants";

type BoardProps = {
  board: readonly BoardField[];
  selectedCell: number;
};

export const Board = ({ board, selectedCell }: BoardProps) => {
  const rows: React.ReactNode[] = [];

  for (let row = 0; row < BOARD_ROWS; row++) {
    rows.push(
      <BoardRow
        key={`row-${row}`}
        board={board}
        rowIndex={row}
        cols={BOARD_COLS}
        selectedCell={selectedCell}
      />,
    );

    if (row < BOARD_ROWS - 1) {
      rows.push(<Border key={`border-${row}`} type="mid" />);
    }
  }

  return (
    <Box flexDirection="column" alignItems="center">
      <Border type="top" />
      {rows}
      <Border type="bot" />
    </Box>
  );
};
