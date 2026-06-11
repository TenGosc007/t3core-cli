import type { AppRoute } from "../navigation/routes";

import { GameView } from "../features/game/game";

export const GameScreen = async (): Promise<AppRoute> => {
  return GameView();
};
