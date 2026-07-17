import type { BoardField } from "t3core";

import { Box, Text } from "ink";

import { BoardItem } from "./BoardItem";

type BoardRowProps = {
  board: readonly BoardField[];
  rowIndex: number;
  cols: number;
  selectedCell: number;
};

const Separator = () => <Text color="gray">│</Text>;

export const BoardRow = ({
  board,
  rowIndex,
  cols,
  selectedCell,
}: BoardRowProps) => {
  const cells: React.ReactNode[] = [];

  for (let col = 0; col < cols; col++) {
    const index = rowIndex * cols + col;
    cells.push(
      <BoardItem
        key={`cell-${index}`}
        value={board[index]}
        index={index}
        selectedCell={selectedCell}
      />,
    );
    if (col < cols - 1) {
      cells.push(<Separator key={`sep-${index}`} />);
    }
  }

  return (
    <Box>
      <Separator />
      {cells}
      <Separator />
    </Box>
  );
};
