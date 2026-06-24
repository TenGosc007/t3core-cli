import type { GameEngine } from "@/features/game/engine";

import { gameStateManager } from "@/features/game/services/gameState";

type ValidateSelectedFieldProps = {
  entry: number;
  game: GameEngine;
  index?: number;
};

export const validateSelectedField = ({
  entry,
  game,
  index = entry,
}: ValidateSelectedFieldProps) => {
  if (!gameStateManager.historyMode && game.isFieldOccupied(index)) {
    gameStateManager.setInputError(`Field ${entry} already selected`);
    return false;
  }
  return true;
};
