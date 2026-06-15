import type { AppRoute } from "@/navigation/routes";

import { getGame } from "@/features/game/services/gameSession";
import { ROUTES } from "@/navigation/routes";

import { gameState } from "../../services/gameState";
import { GameHint } from "../GameHint";
import { InputErrorMessage } from "../InputErrorMessage";
import { PlayerPrompt } from "../PlayerPrompt";
import { getPlayerAnswer } from "./utils/getPlayerAnswer";
import { playAgain } from "./utils/playAgain";

export const PlayerEntry = async (): Promise<AppRoute | null | number> => {
  const game = getGame();

  if (game.gameStatus.status !== "running") {
    await playAgain();
    return null;
  }

  PlayerPrompt();
  GameHint();
  InputErrorMessage();

  const answer = await getPlayerAnswer();
  if (answer === "quit") return ROUTES.MENU;
  if (answer == null) return null;

  if (gameState.historyMode) {
    game.backToMove(answer);
    gameState.toggleState("historyMode");
  } else {
    // game.savePlayerMove(answer - 1);
  }

  return null;
};
