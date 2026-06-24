import { gameManager } from "../../engine";
import { BoardUI } from "../ui/BoardUI";

export const Board = (selectedIndex?: number | null) => {
  const game = gameManager.getGame();
  const fields = game.getBoard();

  BoardUI({ fields, selectedIndex });
};
