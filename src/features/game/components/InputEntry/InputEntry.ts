import type { GameStateManager } from "../../services/gameState";
import type { GameEngine } from "@/features/game/engine";
import type { NavKey } from "@/global/navigationKeys";

import { getInputAnswer } from "@/features/game/components/InputEntry/utils/getInputAnswer";
import { handleInputAnswer } from "@/features/game/components/InputEntry/utils/handleInputAnswer";
import { NAV_KEYS } from "@/global/navigationKeys";

type InputEntryProps = {
  game: GameEngine;
  gameState: GameStateManager;
};

export const InputEntry = async ({
  game,
  gameState,
}: InputEntryProps): Promise<NavKey | null | number> => {
  const answer = await getInputAnswer({ game, gameState });
  if (answer === NAV_KEYS.Q) return answer;

  return handleInputAnswer({ answer, game });
};
