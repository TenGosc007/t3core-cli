import type { NavKey } from "@/global/navigationKeys";

import { gameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";
import { getGame } from "@/features/game/services/gameSession";
import { gameState } from "@/features/game/services/gameState";

const saveAnswer = (answer: number) => {
  const keyHandler = gameKeyHandlerService.get();
  if (keyHandler?.running) return null;

  const game = getGame();
  game.savePlayerMove(answer - 1);
};

export const handleInputAnswer = (answer: number | NavKey | null) => {
  if (answer == null || typeof answer === "string") return null;

  if (gameState.historyMode) {
    const game = getGame();
    game.backToMove(answer);
    gameState.toggleState("historyMode");
    return null;
  }

  saveAnswer(answer);

  return null;
};
