import type { GameEngine } from "@/features/game/engine";

import { waitForInput } from "@/services/inputService";

type PlayAgainProps = {
  game: GameEngine;
};

export const playAgain = async ({ game }: PlayAgainProps) => {
  const isGameOver = game.isGameOver();

  if (isGameOver) {
    console.log(`\t`);
    await waitForInput("Press enter to play again ");
    game.reset();
  }

  return isGameOver;
};
