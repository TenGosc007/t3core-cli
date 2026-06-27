import type { GameEngine } from "@/features/game/engine";

import {
  gameStateManager,
  type GameStateManager,
} from "@/features/game/services/gameState";

type ValidateSelectedFieldProps = {
  entry: number;
  game: GameEngine;
  index?: number;
  gameState?: GameStateManager;
};

export const validateSelectedField = ({
  entry,
  game,
  index = entry,
  gameState,
}: ValidateSelectedFieldProps) => {
  const state = gameState ?? gameStateManager;
  if (!state.historyMode && game.isFieldOccupied(index)) {
    state.setInputError(`Field ${entry} already selected`);
    return false;
  }
  return true;
};
