import type { BoardField } from "t3core";

import { Box } from "ink";
import { Fragment } from "react";

import { toGrid } from "./boardAdapter";
import { BoardRow } from "./components/BoardRow";
import { Border } from "./components/Border";

type BoardProps = {
  board: readonly BoardField[];
  selectedCell: number;
};

export const Board = ({ board, selectedCell }: BoardProps) => {
  const grid = toGrid(board, selectedCell);

  return (
    <Box flexDirection="column" alignItems="center">
      <Border type="top" />
      {grid.map((cells, row) => (
        <Fragment key={row}>
          <BoardRow cells={cells} />
          {row < grid.length - 1 && <Border type="mid" />}
        </Fragment>
      ))}
      <Border type="bot" />
    </Box>
  );
};
