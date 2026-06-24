import type { BoardField } from "t3core";

import { DEFAULT_GAME_SYMBOLS } from "t3core";

import { s } from "@/utils/styledLabel";

export const colorLabelSymbol = (label: BoardField) => {
  if (typeof label === "number") return s.grey(label);
  if (label === DEFAULT_GAME_SYMBOLS[0]) return s.green.bold(label);
  if (label === DEFAULT_GAME_SYMBOLS[1]) return s.red.bold(label);

  return s.bold(label);
};
