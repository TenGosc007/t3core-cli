import { BOARD_SIZE } from "@/features/game/constants/game.constants";
import { getGame } from "@/features/game/services/gameSession";
import { gameState } from "@/features/game/services/gameState";
import { getSettings } from "@/services/settings";

import { validateFieldRange } from "./validateFieldRange";
import { validateSelectedField } from "./validateSelectedField";

const getStartAndRange = () => {
  const game = getGame();
  const isHistoryMode = gameState.historyMode;

  const range = isHistoryMode ? game.movesCount : BOARD_SIZE;
  const start = isHistoryMode ? 0 : 1;

  return { range, start };
};

export const validatePlayerEntry = (entry: number) => {
  const settings = getSettings();
  const isArrowKeyOn = settings.arrowKeyNavigation;

  const { range, start } = getStartAndRange();
  const index = isArrowKeyOn ? entry : entry - 1;

  const validField =
    validateFieldRange(entry, range, start) &&
    validateSelectedField(entry, index);

  return validField ? entry : null;
};
