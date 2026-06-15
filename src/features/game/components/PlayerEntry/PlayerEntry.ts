import type { AppRoute } from "@/navigation/routes";

import { getGame } from "@/features/game/services/gameSession";

import { getPlayerAnswer } from "./utils/getPlayerAnswer";
import { playAgain } from "./utils/playAgain";
import { validatePlayerAnswer } from "./utils/validatePlayerAnswer";

export const PlayerEntry = async (): Promise<AppRoute | null | number> => {
  const game = getGame();

  if (game.gameStatus.status !== "running") {
    await playAgain();
    return null;
  }

  const answer = await getPlayerAnswer();
  const result = validatePlayerAnswer(answer);

  return result;
};
