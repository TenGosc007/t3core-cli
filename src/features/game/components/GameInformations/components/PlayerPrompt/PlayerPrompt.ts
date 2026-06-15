import { s } from "@/utils/styledLabel";

import { getGame } from "../../services/gameSession";
import { colorLabelSymbol } from "../../util/colorLabelSymbol";

export const PlayerPrompt = () => {
  const game = getGame();

  console.log(`\t`);
  console.log(
    `${s.white.underline("Player:")} (${colorLabelSymbol(game.currentPlayer)})`,
  );
  console.log(`\t`);
};
