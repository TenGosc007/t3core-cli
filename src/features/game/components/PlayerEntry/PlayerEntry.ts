import type { AppRoute } from "@/navigation/routes";

import { getGame } from "@/features/game/services/gameSession";
import { ROUTES } from "@/navigation/routes";

import { gameState } from "../../services/gameState";
import { GameHint } from "../GameHint";
import { InputErrorMessage } from "../InputErrorMessage";
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
  GameHint();
  InputErrorMessage();

  const answer = await getPlayerAnswer();
  if (answer === "quit") return ROUTES.MENU;

  if (answer != null) {
    gameState.inputError = null;
    if (gameState.historyMode) {
      game.backToMove(answer);
      gameState.toggleState("historyMode");
    } else {
      game.savePlayerMove(answer - 1);
    }
  }

  return ROUTES.GAME;
};
