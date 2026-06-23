import { getGame, resetGame } from "@/features/game/services/gameSession";
import { gameState } from "@/features/game/services/gameState";
import { NAV_KEYS } from "@/global/navigationKeys";

const QuitKeys = [NAV_KEYS.Q, NAV_KEYS.ESCAPE, NAV_KEYS.BACKSPACE] as const;

export const actionKeysHandler = (key: string | null) => {
  const game = getGame();

  if (QuitKeys.some((k) => k === key)) {
    resetGame();
    gameState.reset();
    return NAV_KEYS.Q;
  }

  if (key === NAV_KEYS.H && game.movesCount > 0) {
    gameState.toggleState("historyMode");
    return NAV_KEYS.H;
  }

  if (key === NAV_KEYS.I) {
    gameState.toggleState("info");
    return NAV_KEYS.I;
  }

  return null;
};
