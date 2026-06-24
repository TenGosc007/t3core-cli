import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { GameHintUI } from "@/features/game/components/ui/GameHintUI";
import { InputErrorMessageUI } from "@/features/game/components/ui/InputErrorMessageUI";
import { PlayerPromptUI } from "@/features/game/components/ui/PlayerPromptUI";

type GameInformationsProps = {
  game: GameEngine;
  isKeyHandlerRunning: boolean;
  gameState: GameStateManager;
};

export const GameInformations = ({
  game,
  isKeyHandlerRunning,
  gameState,
}: GameInformationsProps) => {
  if (game.getStatus().status !== "running") return;

  const error = gameState.inputError;
  const isHistoryMode = gameState.historyMode;
  const currentPlayer = game.getCurrentPlayer();
  const movesCount = game.getMovesCount();

  PlayerPromptUI({ currentPlayer });
  GameHintUI({ movesCount, isKeyHandlerRunning, isHistoryMode });
  InputErrorMessageUI({ error });
};
