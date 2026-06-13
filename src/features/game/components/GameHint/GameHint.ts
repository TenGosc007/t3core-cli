import { getSettings } from "@/global/settings.global";
import { s } from "@/utils/styledLabel";

import { getGame } from "../../services/gameSession";
import { gameState } from "../../services/gameState";

export const GameHint = () => {
  const game = getGame();
  const isHistoryMode = gameState.historyMode;
  const settings = getSettings();
  const useArrowKeys = settings.arrowKeyNavigation && !isHistoryMode;

  const instruction = isHistoryMode
    ? `Back to previous move from 0 to ${game.movesCount}.
(0 is start from the beginning)`
    : useArrowKeys
      ? "Use arrow keys to navigate, Enter to confirm"
      : "Select the number of the field (1-9)";

  console.log(s.white(instruction));
  if (game.movesCount > 0)
    console.log(
      s.dim(`Press "h" to ${isHistoryMode ? "hide" : "show"} game history`),
    );
  console.log(s.dim('Press "q" to back to the main menu'));
  console.log(`\t`);
};
