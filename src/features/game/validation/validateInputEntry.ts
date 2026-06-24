import { BOARD_SIZE } from "@/features/game/constants/game.constants";
import { gameState } from "@/features/game/services/gameState";

import { gameManager } from "../engine";
import { validateFieldRange } from "./validateFieldRange";
import { validateSelectedField } from "./validateSelectedField";

const getStartAndRange = () => {
  const game = gameManager.getGame();
  const isHistoryMode = gameState.historyMode;

  const range = isHistoryMode ? game.getMovesCount() : BOARD_SIZE;
  const start = isHistoryMode ? 0 : 1;

  return { range, start };
};

const entryHelper = (entryProp: number, isArrowKeyOn: boolean) => {
  const index = isArrowKeyOn ? entryProp : entryProp - 1;
  const entry = isArrowKeyOn ? entryProp + 1 : entryProp;

  return { index, entry };
};

export const validateInputEntry = (
  entryProp: number,
  isArrowKeyOn: boolean,
) => {
  const { range, start } = getStartAndRange();
  const { index, entry } = entryHelper(entryProp, isArrowKeyOn);

  gameState.setInputError(null);

  const validField =
    validateFieldRange(entry, range, start) &&
    validateSelectedField(entry, index);

  return validField ? entry : null;
};
