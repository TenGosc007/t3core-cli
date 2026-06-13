import type { AppRoute } from "@/navigation/routes";

import { getGame } from "@/features/game/services/gameSession";
import { ROUTES } from "@/navigation/routes";

import { PlayerPrompt } from "../PlayerPrompt";
import { getPlayerAnswer } from "./utils/getPlayerAnswer";
import { playAgain } from "./utils/playAgain";

export const PlayerEntry = async (): Promise<AppRoute> => {
  const game = getGame();

  if (game.gameStatus.status !== "running") {
    await playAgain();
    return ROUTES.GAME;
  }

  PlayerPrompt();

  const answer = await getPlayerAnswer();
  if (answer === "quit") return ROUTES.MENU;

  if (answer != null) game.savePlayerMove(answer);

  return ROUTES.GAME;
};
