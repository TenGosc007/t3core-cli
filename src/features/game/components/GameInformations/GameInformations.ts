import { GameHintUI } from "@/features/game/components/ui/GameHintUI";
import { InputErrorMessageUI } from "@/features/game/components/ui/InputErrorMessageUI";
import { PlayerPromptUI } from "@/features/game/components/ui/PlayerPromptUI";
import { gameManager } from "@/features/game/engine";
import { gameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";
import { gameState } from "@/features/game/services/gameState";

export const GameInformations = () => {
  const game = gameManager.getGame();
  if (game.getStatus().status !== "running") return;

  const error = gameState.inputError;
  const keyHandler = gameKeyHandlerService.get();

  PlayerPromptUI({ currentPlayer: game.getCurrentPlayer() });
  GameHintUI({
    movesCount: game.getMovesCount(),
    isKeyHandlerRunning: !!keyHandler?.running,
    isHistoryMode: gameState.historyMode,
  });
  InputErrorMessageUI({ error });
};
