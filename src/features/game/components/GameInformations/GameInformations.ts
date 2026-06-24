import type { GameEngine } from "@/features/game/engine";

import { GameHintUI } from "@/features/game/components/ui/GameHintUI";
import { InputErrorMessageUI } from "@/features/game/components/ui/InputErrorMessageUI";
import { PlayerPromptUI } from "@/features/game/components/ui/PlayerPromptUI";
import { gameState } from "@/features/game/services/gameState";

type GameInformationsProps = {
  game: GameEngine;
  isKeyHandlerRunning: boolean;
};

export const GameInformations = ({
  game,
  isKeyHandlerRunning,
}: GameInformationsProps) => {
  if (game.getStatus().status !== "running") return;

  const error = gameState.inputError;

  PlayerPromptUI({ currentPlayer: game.getCurrentPlayer() });
  GameHintUI({
    movesCount: game.getMovesCount(),
    isKeyHandlerRunning,
    isHistoryMode: gameState.historyMode,
  });
  InputErrorMessageUI({ error });
};
