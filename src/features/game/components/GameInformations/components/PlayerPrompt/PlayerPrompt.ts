import { gameManager } from "@/features/game/engine";
import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";
import { s } from "@/utils/styledLabel";

export const PlayerPrompt = () => {
  const game = gameManager.getGame();

  console.log(`\t`);
  console.log(
    `${s.white.underline("Player:")} (${colorLabelSymbol(game.getCurrentPlayer())})`,
  );
  console.log(`\t`);
};
