import type { GameEngine } from "../engine/gameEngine";

type ValidateMoveProps = {
  index: number;
  game: GameEngine;
  isHistoryMode: boolean;
};

export const validateMove = ({
  index,
  game,
  isHistoryMode,
}: ValidateMoveProps): string | null => {
  if (!isHistoryMode && game.isFieldSelectedByIndex(index)) {
    return `Field ${index + 1} already selected`;
  }
  return null;
};
