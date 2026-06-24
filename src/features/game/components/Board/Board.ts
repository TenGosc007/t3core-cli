import type { GameEngine } from "@/features/game/engine";

import { BoardUI } from "@/features/game/components/ui/BoardUI";

type BoardProps = {
  game: GameEngine;
  selectedIndex?: number | null;
};

export const Board = ({ game, selectedIndex }: BoardProps) => {
  const fields = game.getBoard();

  BoardUI({ fields, selectedIndex });
};
