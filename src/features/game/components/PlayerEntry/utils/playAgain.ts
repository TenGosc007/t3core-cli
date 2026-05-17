import { UserInput } from "@/components/UserInput";
import { resetGame } from "@/features/game/services/gameSession";

export const playAgain = async () => {
  console.log(`\t`);
  await UserInput("Press enter to play again ");
  resetGame();
};
