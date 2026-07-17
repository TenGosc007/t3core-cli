import { useGoBack } from "@/hooks/useGoBack";

import { Game as GameView } from "../features/Game";

export const Game = () => {
  useGoBack();

  return <GameView />;
};
