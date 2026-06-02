import { getGame } from "@/features/game/services/gameSession";
import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";
import { navigateTo } from "@/navigation";
import { styledLabel } from "@/utils/styledLabel";

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
    `${styledLabel("Player:", { textStyle: "underline", color: "white" })} (${colorLabelSymbol(game.currentPlayer)})`,
  );
  console.log(`\t`);
  console.log(
    `${styledLabel("Select the number of the field (1-9)", { color: "white" })}`,
  );
  console.log(
    `${styledLabel('Press "q" to back to the main menu', { textStyle: "dim" })}`,
  );
  console.log(`\t`);

  const answer = await getPlayerAnswer();
  console.log("answer", answer);
  if (answer == null) return;

  game.savePlayerMove(answer);
  navigateTo("game");
};
