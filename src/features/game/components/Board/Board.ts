import type { BoardField } from "t3core";

import { getGame } from "@/features/game/services/gameSession";
import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";
import { s } from "@/utils/styledLabel";

export const Board = () => {
  const game = getGame();
  const fields = game.board;

  const top = s.grey.bold("┌───┬───┬───┐");
  const mid = s.grey.bold("├───┼───┼───┤");
  const bot = s.grey.bold("└───┴───┴───┘");
  const col = s.grey.bold("│");

  console.log(top);
  fields.forEach((i: BoardField, idx: number) => {
    if (idx % 3 === 0) {
      const row = idx / 3;
      console.log(
        `${col} ${colorLabelSymbol(i)} ${col} ${colorLabelSymbol(
          fields[idx + 1],
        )} ${col} ${colorLabelSymbol(fields[idx + 2])} ${col}`,
      );
      console.log(row < 2 ? mid : bot);
    }
  });
};
