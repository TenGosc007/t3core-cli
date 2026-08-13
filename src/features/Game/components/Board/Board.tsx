import type { BoardField } from "../../engine/gameEngine";

import { Box } from "ink";
import { Fragment, useMemo } from "react";

import { toGrid } from "./boardAdapter";
import { BoardRow } from "./components/BoardRow";
import { Border } from "./components/Border";

type BoardProps = {
  board: readonly BoardField[];
  selectedCell: number;
  dimColor?: boolean;
};

export const Board = ({ board, selectedCell, dimColor }: BoardProps) => {
  const grid = useMemo(
    () => toGrid(board, selectedCell),
    [board, selectedCell],
  );

  return (
    <Box flexDirection="column" alignSelf="center">
      <Border type="top" />
      {grid.map((cells, row) => (
        <Fragment key={row}>
          <BoardRow cells={cells} dimColor={dimColor} />
          {row < grid.length - 1 && <Border type="mid" />}
        </Fragment>
      ))}
      <Border type="bot" />
    </Box>
  );
};
