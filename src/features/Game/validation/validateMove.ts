import type { GameEngine } from "../engine/gameEngine";

import { BOARD_LENGTH } from "@/features/Game/constants/gameConstants";

import { validateSelectedField } from "./validateSelectedField";

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
  if (isHistoryMode) {
    const range = game.movesCount;
    if (index < 0 || index > range) {
      return `Please enter a valid move number (0-${range})`;
    }
    return null;
  }

  if (index < 0 || index >= BOARD_LENGTH) {
    return `Please enter a valid number (1-${BOARD_LENGTH}) and press enter`;
  }

  return validateSelectedField({ index, game, isHistoryMode });
};
