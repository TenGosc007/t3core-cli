import type { BoardField } from "t3core";

import { Box, Text } from "ink";
import { DEFAULT_GAME_SYMBOLS } from "t3core";

type BoardProps = {
  board: readonly BoardField[];
  selectedCell: number;
};

const BOARD_ROWS = 3;
const BOARD_COLS = 3;

const formatCell = (value: BoardField, index: number, selectedCell: number) => {
  const isSelected = index === selectedCell;

  if (typeof value === "number") {
    return (
      <Text color={isSelected ? "yellow" : "gray"} bold={isSelected}>
        {isSelected ? `[${value}]` : ` ${value} `}
      </Text>
    );
  }

  const isX = value === DEFAULT_GAME_SYMBOLS[0];
  const color = isX ? "green" : "red";

  if (isSelected) {
    return (
      <Text color="yellow" bold>
        [{value}]
      </Text>
    );
  }

  return (
    <Text color={color} bold>
      {` ${value} `}
    </Text>
  );
};

const Border = ({ type }: { type: "top" | "mid" | "bot" }) => {
  const chars = {
    top: { left: "┌", mid: "┬", right: "┐" },
    mid: { left: "├", mid: "┼", right: "┤" },
    bot: { left: "└", mid: "┴", right: "┘" },
  }[type];

  return (
    <Text color="gray" bold>
      {chars.left}
      {"───"}
      {chars.mid}
      {"───"}
      {chars.mid}
      {"───"}
      {chars.right}
    </Text>
  );
};

export const Board = ({ board, selectedCell }: BoardProps) => {
  const rows: React.ReactNode[] = [];

  for (let row = 0; row < BOARD_ROWS; row++) {
    const cells: React.ReactNode[] = [];
    for (let col = 0; col < BOARD_COLS; col++) {
      const index = row * BOARD_COLS + col;
      cells.push(formatCell(board[index], index, selectedCell));
      if (col < BOARD_COLS - 1) {
        cells.push(
          <Text color="gray" bold>
            │
          </Text>,
        );
      }
    }

    rows.push(
      <Box key={`row-${row}`}>
        <Text color="gray" bold>
          │
        </Text>
        {cells}
        <Text color="gray" bold>
          │
        </Text>
      </Box>,
    );

    if (row < BOARD_ROWS - 1) {
      rows.push(<Border key={`border-${row}`} type="mid" />);
    }
  }

  return (
    <Box flexDirection="column">
      <Border type="top" />
      {rows}
      <Border type="bot" />
    </Box>
  );
};
