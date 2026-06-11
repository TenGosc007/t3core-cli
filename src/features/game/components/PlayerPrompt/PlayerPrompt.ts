import type { Game } from "t3core";

import { s } from "@/utils/styledLabel";

import { colorLabelSymbol } from "../../util/colorLabelSymbol";

export const PlayerPrompt = (game: Game) => {
  console.log(`\t`);
  console.log(
    `${s.white.underline("Player:")} (${colorLabelSymbol(game.currentPlayer)})`,
  );
  console.log(`\t`);
  console.log(s.white("Select the number of the field (1-9)"));
  if (game.movesCount > 0) {
    console.log(s.dim('Press "h" to show game history'));
  }
  console.log(s.dim('Press "q" to back to the main menu'));
  console.log(`\t`);
};
