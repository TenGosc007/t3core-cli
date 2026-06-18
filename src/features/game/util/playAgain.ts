import { getGame, resetGame } from "@/features/game/services/gameSession";
import { waitForInput } from "@/services/inputService";

export const playAgain = async () => {
  const game = getGame();
  const isGameRunning = game.gameStatus.status === "running";

  if (!isGameRunning) {
    console.log(`\t`);
    await waitForInput("Press enter to play again ");
    resetGame();
  }

  return !isGameRunning;
};
