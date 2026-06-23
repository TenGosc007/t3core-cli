import { gameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";
import { getGame } from "@/features/game/services/gameSession";
import { gameState } from "@/features/game/services/gameState";
import { s } from "@/utils/styledLabel";

const getHistoryInstruction = () => {
  const game = getGame();
  const keyHandler = gameKeyHandlerService.get();
  const useArrowKeys = keyHandler?.running;

  return useArrowKeys
    ? "SelectPrevious move"
    : `Back to previous move from 0 to ${game.movesCount}.
(0 is start from the beginning)`;
};

const showInstructionMessage = () => {
  const isHistoryMode = gameState.historyMode;
  const keyHandler = gameKeyHandlerService.get();
  const useArrowKeys = keyHandler?.running && !isHistoryMode;

  const instruction = isHistoryMode
    ? getHistoryInstruction()
    : useArrowKeys
      ? "Use arrow keys to navigate,\nEnter to confirm"
      : "Select the number of the field (1-9)";

  console.log(s.white(instruction));
};

const showHistoryHint = () => {
  const game = getGame();
  const isHistoryMode = gameState.historyMode;

  if (game.movesCount > 0)
    console.log(
      s.dim(`Press "h" to ${isHistoryMode ? "hide" : "show"} game history`),
    );
};

export const GameHint = () => {
  showInstructionMessage();
  showHistoryHint();
  console.log(s.dim('Press "q" to back to the main menu'));
  console.log(`\t`);
};
