import type { GameEngine } from "@/features/game/engine";

import { BOARD_SIZE } from "@/features/game/constants/game.constants";
import { gameStateManager } from "@/features/game/services/gameState";

import { validateFieldRange } from "./validateFieldRange";
import { validateSelectedField } from "./validateSelectedField";

type ValidateInputEntryProps = {
  entryProp: number;
  game: GameEngine;
  isArrowKeyOn: boolean;
};

const getStartAndRange = (movesCount: number) => {
  const isHistoryMode = gameStateManager.historyMode;

  const range = isHistoryMode ? movesCount : BOARD_SIZE;
  const start = isHistoryMode ? 0 : 1;

  return { range, start };
};

const entryHelper = (entryProp: number, isArrowKeyOn: boolean) => {
  const index = isArrowKeyOn ? entryProp : entryProp - 1;
  const entry = isArrowKeyOn ? entryProp + 1 : entryProp;

  return { index, entry };
};

export const validateInputEntry = ({
  entryProp,
  game,
  isArrowKeyOn,
}: ValidateInputEntryProps) => {
  const { range, start } = getStartAndRange(game.getMovesCount());
  const { index, entry } = entryHelper(entryProp, isArrowKeyOn);

  gameStateManager.setInputError(null);

  const validField =
    validateFieldRange(entry, range, start) &&
    validateSelectedField({ entry, game, index });

  return validField ? entry : null;
};
