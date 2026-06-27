import type { GameEngine } from "@/features/game/engine";
import type { NavKey } from "@/global/navigationKeys";
import type { KeyHandler } from "@/services/keyHandlerService";

import {
  gameStateManager,
  type GameStateManager,
} from "@/features/game/services/gameState";

type HandleInputAnswerProps = {
  answer: number | NavKey | null;
  game: GameEngine;
  gameState?: GameStateManager;
  keyHandler?: KeyHandler | null;
};

const saveAnswer = ({ answer, game, keyHandler }: HandleInputAnswerProps) => {
  if (answer == null || typeof answer === "string") return null;

  if (keyHandler?.running) return null;

  game.makeMove(answer - 1);
};

export const handleInputAnswer = ({
  answer,
  game,
  gameState,
  keyHandler,
}: HandleInputAnswerProps) => {
  if (answer == null || typeof answer === "string") return null;

  const state = gameState ?? gameStateManager;

  if (state.historyMode) {
    game.backToMove(answer);
    state.toggleHistoryMode();
    return null;
  }

  saveAnswer({ answer, game, keyHandler });

  return null;
};
