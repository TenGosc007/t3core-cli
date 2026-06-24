import { gameManager } from "../../engine";
import { GameStatusMessageUI } from "../ui/GameStatusMessageUI";

export const GameStatusMessage = () => {
  const game = gameManager.getGame();
  const gameStatus = game.getStatus();

  GameStatusMessageUI({ gameStatus });
};
