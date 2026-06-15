import { getGame } from "@/features/game/services/gameSession";
import { gameState } from "@/features/game/services/gameState";
import { ROUTES } from "@/navigation/routes";

export const validatePlayerAnswer = (answer: number | string | null) => {
  const game = getGame();

  if (answer === "quit") return ROUTES.MENU;
  if (answer == null || typeof answer !== "number") return null;

  if (gameState.historyMode) {
    game.backToMove(answer);
    gameState.toggleState("historyMode");
    return null;
  }

  game.savePlayerMove(answer - 1);

  return null;
};
