import { getGame } from "@/features/game/services/gameSession";
import { NAV_KEYS } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";

import { playAgain } from "../../util/playAgain";
import { getInputAnswer } from "./utils/getInputAnswer";
import { handleInputAnswer } from "./utils/handleInputAnswer";

export const InputEntry = async (): Promise<AppRoute | null | number> => {
  const game = getGame();

  if (game.gameStatus.status !== "running") {
    await playAgain();
    return null;
  }

  const answer = await getInputAnswer();
  if (answer === NAV_KEYS.Q) return ROUTES.MENU;

  const result = handleInputAnswer(answer);

  return result;
};
