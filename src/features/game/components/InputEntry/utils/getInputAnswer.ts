import type { GameEngine, GameManager } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";
import type { NavKey } from "@/global/navigationKeys";

import { gameManager } from "@/features/game/engine";
import { validateInputEntry } from "@/features/game/validation/validateInputEntry";
import { waitForInput } from "@/services/inputService";
import { s } from "@/utils/styledLabel";

import { actionKeysHandler } from "./actionKeysHandler";

type GetInputAnswerProps = {
  game: GameEngine;
  gameState: GameStateManager;
  manager?: GameManager;
};

export const getInputAnswer = async ({
  game,
  gameState,
  manager = gameManager,
}: GetInputAnswerProps): Promise<number | NavKey | null> => {
  const answer = await waitForInput(s.yellow("Your choice: "));

  const actionKey = actionKeysHandler({ key: answer, manager, gameState });
  if (actionKey) return actionKey;

  return validateInputEntry({
    entryProp: parseInt(answer ?? ""),
    game,
    isArrowKeyOn: false,
    isInHistoryMode: gameState.historyMode,
    gameState,
  });
};
