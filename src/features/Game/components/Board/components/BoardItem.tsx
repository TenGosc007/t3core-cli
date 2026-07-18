import type { CellViewModel } from "../boardAdapter";

import { Text } from "ink";
import { DEFAULT_GAME_SYMBOLS } from "t3core";

type BoardItemProps = {
  cell: CellViewModel;
};

const getColor = (isSelected: boolean, value: CellViewModel["value"]) => {
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

export const BoardItem = ({ cell }: BoardItemProps) => {
  const isBold =
    cell.isSelected || DEFAULT_GAME_SYMBOLS.some((v) => v === cell.value);
  const color = getColor(cell.isSelected, cell.value);
  const content = cell.isSelected ? `[${cell.value}]` : ` ${cell.value} `;

  return (
    <Text bold={isBold} color={color}>
      {content}
    </Text>
  );
};
