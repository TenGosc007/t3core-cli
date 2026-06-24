import { BoardUI } from "@/features/game/components/ui/BoardUI";
import { gameManager } from "@/features/game/engine";

export const Board = (selectedIndex?: number | null) => {
  const game = gameManager.getGame();
  const fields = game.getBoard();

  BoardUI({ fields, selectedIndex });
};
