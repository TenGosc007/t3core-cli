import { GameStatusMessageUI } from "@/features/game/components/ui/GameStatusMessageUI";
import { gameManager } from "@/features/game/engine";

export const GameStatusMessage = () => {
  const game = gameManager.getGame();
  const gameStatus = game.getStatus();

  GameStatusMessageUI({ gameStatus });
};
