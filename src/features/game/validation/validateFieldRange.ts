import { gameStateManager } from "@/features/game/services/gameState";

export const validateFieldRange = (
  index: number,
  range: number,
  start: number = 1,
) => {
  const isFieldOutOfRange = index < start || index > range;
  if (isNaN(index) || isFieldOutOfRange) {
    gameStateManager.setInputError(
      `Please enter a valid number (${start}-${range}) and press enter`,
    );
    return false;
  }
  return true;
};
