import { gameManager } from "../../engine";
import { gameKeyHandlerService } from "../../services/gameKeyHandlerService";
import { gameState } from "../../services/gameState";
import { GameHintUI } from "../ui/GameHintUI";
import { InputErrorMessageUI } from "../ui/InputErrorMessageUI";
import { PlayerPromptUI } from "../ui/PlayerPromptUI";

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
