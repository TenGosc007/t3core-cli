import type { GameEngine } from "@/features/game/engine";
import type { NavKey } from "@/global/navigationKeys";

import { gameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";
import { gameState } from "@/features/game/services/gameState";

type HandleInputAnswerProps = {
  answer: number | NavKey | null;
  game: GameEngine;
};

const saveAnswer = ({ answer, game }: HandleInputAnswerProps) => {
  if (answer == null || typeof answer === "string") return null;

  const keyHandler = gameKeyHandlerService.get();
  if (keyHandler?.running) return null;

  game.makeMove(answer - 1);
};

export const handleInputAnswer = ({ answer, game }: HandleInputAnswerProps) => {
  if (answer == null || typeof answer === "string") return null;

  if (gameState.historyMode) {
    game.backToMove(answer);
    gameState.toggleHistoryMode();
    return null;
  }

  saveAnswer({ answer, game });

  return null;
};
