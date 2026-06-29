import type { GameEngine } from "../engine/gameEngine";

type ValidateSelectedFieldProps = {
  index: number;
  game: GameEngine;
  isHistoryMode: boolean;
};

export const validateSelectedField = ({
  index,
  game,
  isHistoryMode,
}: ValidateSelectedFieldProps): string | null => {
  if (!isHistoryMode && game.isFieldSelectedByIndex(index)) {
    return `Field ${index + 1} already selected`;
  }
  return null;
};
