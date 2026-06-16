import type { NavKey } from "@/global/navigationKeys";

import { getGame, resetGame } from "@/features/game/services/gameSession";
import { gameState } from "@/features/game/services/gameState";
import { NAV_KEYS } from "@/global/navigationKeys";
import { waitForInput } from "@/services/inputService";
import { s } from "@/utils/styledLabel";

import { validateInputEntry } from "../../../validation/validateInputEntry";

export const getInputAnswer = async (): Promise<number | NavKey | null> => {
  const answer = await waitForInput(s.yellow("Your choice: "));

  gameState.inputError = null;

  if (answer === NAV_KEYS.Q) {
    resetGame();
    return NAV_KEYS.Q;
  }

  if (answer === NAV_KEYS.H && getGame().movesCount > 0) {
    gameState.toggleState("historyMode");
    return null;
  }

  if (answer === NAV_KEYS.I) {
    gameState.toggleState("info");
    return null;
  }

  return validateInputEntry(Number(answer), false);
};
