import {
  gameStateManager,
  type GameStateManager,
} from "@/features/game/services/gameState";

export const validateFieldRange = (
  index: number,
  range: number,
  start: number = 1,
  gameState?: GameStateManager,
) => {
  const state = gameState ?? gameStateManager;
  const isFieldOutOfRange = index < start || index > range;
  if (isNaN(index) || isFieldOutOfRange) {
    state.setInputError(
      `Please enter a valid number (${start}-${range}) and press enter`,
    );
    return false;
  }
  return true;
};
