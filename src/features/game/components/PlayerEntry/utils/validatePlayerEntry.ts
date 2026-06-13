import { getGame } from "@/features/game/services/gameSession";
import { gameState } from "@/features/game/services/gameState";

const BOARD_SIZE = 9;

export const validatePlayerEntry = (index: number) => {
  const game = getGame();
  const movesCount = game.movesCount;
  const isHistoryMode = gameState.historyMode;

  const range = isHistoryMode ? movesCount : BOARD_SIZE;
  const isOutOfMaxRange = isHistoryMode ? index > range : index > range;

  const isFieldOutOfRange = index < 0 || isOutOfMaxRange;
  if (isNaN(index) || isFieldOutOfRange) {
    gameState.inputError = `Please enter a valid number (1-${range}) and press enter`;
    return false;
  }

  if (!isHistoryMode && game.isFieldSelectedByIndex(index - 1)) {
    gameState.inputError = `Field ${index} already selected`;
    return false;
  }

  gameState.inputError = null;
  return true;
};
