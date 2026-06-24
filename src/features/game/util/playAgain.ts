import { waitForInput } from "@/services/inputService";

import { gameManager } from "../engine";

export const playAgain = async () => {
  const game = gameManager.getGame();
  const isGameRunning = game.getStatus().status === "running";

  if (!isGameRunning) {
    console.log(`\t`);
    await waitForInput("Press enter to play again ");
    gameManager.reset();
  }

  return !isGameRunning;
};
