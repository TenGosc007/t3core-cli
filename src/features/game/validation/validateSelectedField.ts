import type { GameEngine } from "@/features/game/engine";

import { gameState } from "@/features/game/services/gameState";

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
  if (!gameState.historyMode && game.isFieldOccupied(index)) {
    gameState.setInputError(`Field ${entry} already selected`);
    return false;
  }
  return true;
};
