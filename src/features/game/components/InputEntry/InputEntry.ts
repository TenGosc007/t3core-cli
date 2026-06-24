import type { GameEngine, GameManager } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";
import type { NavKey } from "@/global/navigationKeys";

import { getInputAnswer } from "@/features/game/components/InputEntry/utils/getInputAnswer";
import { handleInputAnswer } from "@/features/game/components/InputEntry/utils/handleInputAnswer";
import { NAV_KEYS } from "@/global/navigationKeys";

type InputEntryProps = {
  game: GameEngine;
  gameState: GameStateManager;
  manager?: GameManager;
};

export const InputEntry = async ({
  game,
  gameState,
  manager,
}: InputEntryProps): Promise<NavKey | null | number> => {
  const answer = await getInputAnswer({ game, gameState, manager });
  if (answer === NAV_KEYS.Q) return answer;

  return handleInputAnswer({ answer, game, gameState });
};
