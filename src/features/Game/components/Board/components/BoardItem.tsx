import type { CellViewModel } from "../boardAdapter";

import { Text } from "ink";
import { memo } from "react";

import { DEFAULT_SYMBOLS } from "../../../engine/gameEngine";

type BoardItemProps = {
  cell: CellViewModel;
};

const getColor = (isSelected: boolean, value: CellViewModel["value"]) => {
  if (isSelected) {
    return "yellow";
  }
  if (value === DEFAULT_SYMBOLS[0]) {
    return "green";
  }
  if (value === DEFAULT_SYMBOLS[1]) {
    return "red";
  }
  return "gray";
};

export const BoardItem = memo(({ cell }: BoardItemProps) => {
  const isBold =
    cell.isSelected || DEFAULT_SYMBOLS.some((v) => v === cell.value);
  const color = getColor(cell.isSelected, cell.value);
  const content = cell.isSelected ? `[${cell.value}]` : ` ${cell.value} `;

  return (
    <Text bold={isBold} color={color}>
      {content}
    </Text>
  );
});
