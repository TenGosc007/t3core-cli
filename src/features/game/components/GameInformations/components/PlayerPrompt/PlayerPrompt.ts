import { getGame } from "@/features/game/services/gameSession";
import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";
import { s } from "@/utils/styledLabel";

export const PlayerPrompt = () => {
  const game = getGame();

  console.log(`\t`);
  console.log(
    `${s.white.underline("Player:")} (${colorLabelSymbol(game.currentPlayer)})`,
  );
  console.log(`\t`);
};
