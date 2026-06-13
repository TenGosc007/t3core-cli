import type { BoardField } from "t3core";

import { getGame } from "@/features/game/services/gameSession";
import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";
import { s } from "@/utils/styledLabel";

const top = s.grey.bold("┌───┬───┬───┐");
const mid = s.grey.bold("├───┼───┼───┤");
const bot = s.grey.bold("└───┴───┴───┘");
const col = s.grey.bold("│");

const formatCell = (
  value: BoardField,
  index: number,
  selectedIndex?: number,
): string => {
  const isSelected = selectedIndex === index;
  if (isSelected) return s.inverse(value);
  return colorLabelSymbol(value);
};

export const Board = (selectedIndex?: number) => {
  const game = getGame();
  const fields = game.board;

  console.log(top);
  fields.forEach((_, idx: number) => {
    if (idx % 3 === 0) {
      const row = idx / 3;

      const entireRow = `${col} ${formatCell(fields[idx], idx, selectedIndex)} ${col} ${formatCell(
        fields[idx + 1],
        idx + 1,
        selectedIndex,
      )} ${col} ${formatCell(fields[idx + 2], idx + 2, selectedIndex)} ${col}`;

      console.log(entireRow);
      console.log(row < 2 ? mid : bot);
    }
  });
};
