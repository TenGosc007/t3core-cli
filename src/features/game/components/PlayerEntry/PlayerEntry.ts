import { getGame } from "@/features/game/services/gameSession";
import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";
import { navigateTo } from "@/navigation/actions";
import { s } from "@/utils/styledLabel";

import { getPlayerAnswer } from "./utils/getPlayerAnswer";
import { playAgain } from "./utils/playAgain";

export const PlayerEntry = async () => {
  const game = getGame();

  if (game.gameStatus.status !== "running") {
    await playAgain();
    navigateTo("game");
    return;
  }

  console.log(`\t`);
  console.log(
    `${s.white.underline("Player:")} (${colorLabelSymbol(game.currentPlayer)})`,
  );
  console.log(`\t`);
  console.log(`${s.white("Select the number of the field (1-9)")}`);
  if (game.movesCount > 0) {
    console.log(`${s.dim('Press "h" to show game history')}`);
  }
  console.log(`${s.dim('Press "q" to back to the main menu')}`);
  console.log(`\t`);

  const answer = await getPlayerAnswer();
  if (answer == null) return;

  game.savePlayerMove(answer);
  navigateTo("game");
};
