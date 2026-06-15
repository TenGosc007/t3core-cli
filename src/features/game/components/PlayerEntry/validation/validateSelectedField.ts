import { getGame } from "@/features/game/services/gameSession";
import { gameState } from "@/features/game/services/gameState";

export const validateSelectedField = (entry: number, index: number = entry) => {
  const game = getGame();

  if (!gameState.historyMode && game.isFieldSelectedByIndex(index)) {
    gameState.inputError = `Field ${entry} already selected`;
    return false;
  }
  return true;
};
