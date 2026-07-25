import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { BOARD_SIZE } from "@/features/game/constants/game.constants";
import { gameStateManager } from "@/features/game/services/gameState";

import { validateFieldRange } from "./validateFieldRange";
import { validateSelectedField } from "./validateSelectedField";

type ValidateInputEntryProps = {
  entryProp: number;
  game: GameEngine;
  isArrowNavOn: boolean;
  isInHistoryMode: boolean;
  gameState?: GameStateManager;
};

const getStartAndRange = (movesCount: number, isHistoryMode: boolean) => {
  const range = isHistoryMode ? movesCount : BOARD_SIZE;
  const start = isHistoryMode ? 0 : 1;

  return { range, start };
};

const entryHelper = (entryProp: number, isArrowNavOn: boolean) => {
  const index = isArrowNavOn ? entryProp : entryProp - 1;
  const entry = isArrowNavOn ? entryProp + 1 : entryProp;

  return { index, entry };
};

export const validateInputEntry = ({
  entryProp,
  game,
  isArrowNavOn,
  isInHistoryMode,
  gameState,
}: ValidateInputEntryProps) => {
  const state = gameState ?? gameStateManager;
  const { range, start } = getStartAndRange(
    game.getMovesCount(),
    isInHistoryMode,
  );
  const { index, entry } = entryHelper(entryProp, isArrowNavOn);

  gameState?.setInputError(null);

  const validField =
    validateFieldRange(entry, range, start, state) &&
    validateSelectedField({ entry, game, index, gameState: state });

  return validField ? entry : null;
};
