import type { NavKey } from "@/global/navigationKeys";

import { gameManager } from "@/features/game/engine";
import { gameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";
import { gameState } from "@/features/game/services/gameState";

const saveAnswer = (answer: number) => {
  const keyHandler = gameKeyHandlerService.get();
  if (keyHandler?.running) return null;

  const game = gameManager.getGame();
  game.makeMove(answer - 1);
};

export const handleInputAnswer = (answer: number | NavKey | null) => {
  if (answer == null || typeof answer === "string") return null;

  if (gameState.historyMode) {
    const game = gameManager.getGame();
    game.backToMove(answer);
    gameState.toggleHistoryMode();
    return null;
  }

  saveAnswer(answer);

  return null;
};
