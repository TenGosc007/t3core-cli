import type { BoardField } from "t3core";

import {
  BOARD_COLS,
  BOARD_ROWS,
} from "@/features/game/constants/game.constants";
import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";
import { s } from "@/utils/styledLabel";

const buildBorder = (left: string, middle: string, right: string) => {
  return s.grey.bold(
    `${left}${Array(BOARD_COLS).fill("───").join(middle)}${right}`,
  );
};

const top = buildBorder("┌", "┬", "┐");
const mid = buildBorder("├", "┼", "┤");
const bot = buildBorder("└", "┴", "┘");
const col = s.grey.bold("│");

const formatCell = (
  value: BoardField,
  index: number,
  selectedIndex?: number | null,
): string => {
  const isSelected = selectedIndex === index;
  if (isSelected) return s.inverse(value);
  return colorLabelSymbol(value);
};

export type BoardUIProps = {
  fields: BoardField[];
  selectedIndex?: number | null;
};

export const BoardUI = ({ fields, selectedIndex }: BoardUIProps) => {
  console.log(top);

  for (let row = 0; row < BOARD_ROWS; row++) {
    const rowStart = row * BOARD_COLS;
    const cells = Array.from({ length: BOARD_COLS }, (_, colIndex) => {
      const fieldIndex = rowStart + colIndex;
      return formatCell(fields[fieldIndex], fieldIndex, selectedIndex);
    });

    console.log(`${col} ${cells.join(` ${col} `)} ${col}`);
    console.log(row < BOARD_ROWS - 1 ? mid : bot);
  }
};
