import { gameState } from "@/features/game/services/gameState";

import { gameManager } from "../engine";

export const validateSelectedField = (entry: number, index: number = entry) => {
  const game = gameManager.getGame();

  if (!gameState.historyMode && game.isFieldOccupied(index)) {
    gameState.inputError = `Field ${entry} already selected`;
    return false;
  }
  return true;
};
