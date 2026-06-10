import type { BoardField } from "t3core";

import { getGame } from "@/features/game/services/gameSession";
import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";
import { styledLabel } from "@/utils/styledLabel";

const borderStyle = { color: "grey", textStyle: "bold" } as const;

export const Board = () => {
  const game = getGame();
  const fields = game.board;

  const border = styledLabel("-------------", borderStyle);
  const fieldBorder = styledLabel("|", borderStyle);

  console.log(border);
  fields.forEach((i: BoardField, idx: number) => {
    if (idx % 3 === 0) {
      console.log(
        `${fieldBorder} ${colorLabelSymbol(
          i,
        )} ${fieldBorder} ${colorLabelSymbol(
          fields[idx + 1],
        )} ${fieldBorder} ${colorLabelSymbol(fields[idx + 2])} ${fieldBorder}`,
      );
      console.log(border);
    }
  });
};
