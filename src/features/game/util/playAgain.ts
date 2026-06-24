import type { GameEngine } from "@/features/game/engine";

import { waitForInput } from "@/services/inputService";

type PlayAgainProps = {
  game: GameEngine;
};

export const playAgain = async ({ game }: PlayAgainProps) => {
  const isGameRunning = game.getStatus().status === "running";

  if (!isGameRunning) {
    console.log(`\t`);
    await waitForInput("Press enter to play again ");
    game.reset();
  }

  return !isGameRunning;
};
