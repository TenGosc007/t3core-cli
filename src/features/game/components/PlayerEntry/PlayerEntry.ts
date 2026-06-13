import type { AppRoute } from "@/navigation/routes";

import { getGame } from "@/features/game/services/gameSession";
import { getSettings } from "@/global/settings.global";
import { ROUTES } from "@/navigation/routes";

import { gameState } from "../../services/gameState";
import { GameHint } from "../GameHint";
import { InputErrorMessage } from "../InputErrorMessage";
import { PlayerPrompt } from "../PlayerPrompt";
import { arrowKeyInput } from "./utils/arrowKeyInput";
import { getPlayerAnswer } from "./utils/getPlayerAnswer";
import { playAgain } from "./utils/playAgain";

const getAnswer = async () => {
  const settings = getSettings();
  const useArrowKeys = settings.arrowKeyNavigation && !gameState.historyMode;
  if (useArrowKeys) return await arrowKeyInput();
  return await getPlayerAnswer();
};

export const PlayerEntry = async (): Promise<AppRoute> => {
  const game = getGame();

  if (game.gameStatus.status !== "running") {
    await playAgain();
    return ROUTES.GAME;
  }

  PlayerPrompt();
  GameHint();
  InputErrorMessage();

  const answer = await getAnswer();
  if (answer === "quit") return ROUTES.MENU;

  if (answer != null) {
    if (gameState.historyMode) {
      game.backToMove(answer);
      gameState.toggleState("historyMode");
    } else {
      game.savePlayerMove(answer - 1);
    }
  }

  return ROUTES.GAME;
};
