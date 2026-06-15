import { resetGame } from "@/features/game/services/gameSession";
import { waitForInput } from "@/services/inputService";

export const playAgain = async () => {
  console.log(`\t`);
  await waitForInput("Press enter to play again ");
  resetGame();
};
