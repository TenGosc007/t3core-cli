import { gameManager } from "@/features/game/engine";
import { gameState } from "@/features/game/services/gameState";
import { NAV_KEYS } from "@/global/navigationKeys";

const QuitKeys = [NAV_KEYS.Q, NAV_KEYS.ESCAPE, NAV_KEYS.BACKSPACE] as const;

export const actionKeysHandler = (key: string | null) => {
  const game = gameManager.getGame();

  if (QuitKeys.some((k) => k === key)) {
    game.reset();
    gameState.reset();
    return NAV_KEYS.Q;
  }

  if (key === NAV_KEYS.H && game.getMovesCount() > 0) {
    gameState.toggleHistoryMode();
    return NAV_KEYS.H;
  }

  if (key === NAV_KEYS.I) {
    gameState.toggleInfo();
    return NAV_KEYS.I;
  }

  return null;
};
