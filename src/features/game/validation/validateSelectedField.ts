import { gameManager } from "@/features/game/engine";
import { gameState } from "@/features/game/services/gameState";

export const validateSelectedField = (entry: number, index: number = entry) => {
  const game = gameManager.getGame();

  if (!gameState.historyMode && game.isFieldOccupied(index)) {
    gameState.setInputError(`Field ${entry} already selected`);
    return false;
  }
  return true;
};
