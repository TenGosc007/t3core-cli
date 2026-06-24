import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";
import type { NavKey } from "@/global/navigationKeys";

import { validateInputEntry } from "@/features/game/validation/validateInputEntry";
import { waitForInput } from "@/services/inputService";
import { s } from "@/utils/styledLabel";

import { actionKeysHandler } from "./actionKeysHandler";

type GetInputAnswerProps = {
  game: GameEngine;
  gameState: GameStateManager;
};

export const getInputAnswer = async ({
  game,
  gameState,
}: GetInputAnswerProps): Promise<number | NavKey | null> => {
  const answer = await waitForInput(s.yellow("Your choice: "));
  gameState.setInputError(null);

  const actionKey = actionKeysHandler(answer);
  if (actionKey) return actionKey;

  return validateInputEntry({
    entryProp: parseInt(answer ?? ""),
    game,
    isArrowKeyOn: false,
    isInHistoryMode: gameState.historyMode,
  });
};
