import type { GameEngine } from "@/features/game/engine";

import { GameStatusMessageUI } from "@/features/game/components/ui/GameStatusMessageUI";

type GameStatusMessageProps = {
  game: GameEngine;
};

export const GameStatusMessage = ({ game }: GameStatusMessageProps) => {
  const gameStatus = game.getStatus();

  GameStatusMessageUI({ gameStatus });
};
