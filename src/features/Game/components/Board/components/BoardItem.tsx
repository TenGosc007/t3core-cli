import type { BoardField } from "t3core";

import { Text } from "ink";
import { DEFAULT_GAME_SYMBOLS } from "t3core";

type BoardItemProps = {
  value: BoardField;
  index: number;
  selectedCell: number;
};

const getColor = (isSelected: boolean, value: BoardField) => {
  if (isSelected) {
    return "yellow";
  }
  if (value === DEFAULT_GAME_SYMBOLS[0]) {
    return "green";
  }
  if (value === DEFAULT_GAME_SYMBOLS[1]) {
    return "red";
  }
  return "gray";
};

export const BoardItem = ({ value, index, selectedCell }: BoardItemProps) => {
  const isSelected = index === selectedCell;

  const isBold = isSelected || DEFAULT_GAME_SYMBOLS.some((v) => v === value);
  const color = getColor(isSelected, value);
  const content = isSelected ? `[${value}]` : ` ${value} `;

  return (
    <Text bold={isBold} color={color}>
      {content}
    </Text>
  );
};
