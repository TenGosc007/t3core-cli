import { BoardUI } from "@/features/game/components/ui/BoardUI";
import { gameManager } from "@/features/game/engine";

type BoardProps = {
  selectedIndex?: number | null;
};

export const Board = ({ selectedIndex }: BoardProps) => {
  const game = gameManager.getGame();
  const fields = game.getBoard();

  BoardUI({ fields, selectedIndex });
};
