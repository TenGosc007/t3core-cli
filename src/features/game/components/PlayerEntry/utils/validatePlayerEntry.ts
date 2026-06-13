import { getGame } from "@/features/game/services/gameSession";
import { gameState } from "@/features/game/services/gameState";

const BOARD_SIZE = 9;

const validateFieldRange = (index: number, range: number) => {
  const isFieldOutOfRange = index < 0 || index > range;
  if (isNaN(index) || isFieldOutOfRange) {
    gameState.inputError = `Please enter a valid number (1-${range}) and press enter`;
    return false;
  }
  return true;
};

const validateSelectedField = (index: number) => {
  if (!gameState.historyMode && getGame().isFieldSelectedByIndex(index - 1)) {
    gameState.inputError = `Field ${index} already selected`;
    return false;
  }
  return true;
};

export const validatePlayerEntry = (index: number) => {
  const game = getGame();
  const movesCount = game.movesCount;
  const isHistoryMode = gameState.historyMode;

  const range = isHistoryMode ? movesCount : BOARD_SIZE;

  const validField =
    validateFieldRange(index, range) && validateSelectedField(index);

  return validField ? index : null;
};
