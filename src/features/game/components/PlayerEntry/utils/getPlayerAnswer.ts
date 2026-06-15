import { gameState } from "@/features/game/services/gameState";
import { waitForInput } from "@/services/inputService";
import { ArrowKeyInstance } from "@/services/keyHandlerService/navInstances/arrowKeyInstance";
import { getSettings } from "@/services/settings/settings";
import { s } from "@/utils/styledLabel";

import { getGame, resetGame } from "../../../services/gameSession";
import { validatePlayerEntry } from "../validation/validatePlayerEntry";

const getAnswer = async () => {
  const settings = getSettings();
  const useArrowKeys = settings.arrowKeyNavigation && !gameState.historyMode;
  const handler = ArrowKeyInstance.get();

  if (useArrowKeys && handler) return await handler.waitForKeyPress();
  return await waitForInput(s.yellow("Your choice: "));
};

export const getPlayerAnswer = async (): Promise<number | "quit" | null> => {
  const answer = await getAnswer();

  gameState.inputError = null;

  if (answer === "q") {
    resetGame();
    return "quit";
  }

  if (answer === "h" && getGame().movesCount > 0) {
    gameState.toggleState("historyMode");
    return null;
  }

  if (answer === "i") {
    gameState.toggleState("info");
    return null;
  }

  return validatePlayerEntry(Number(answer));
};
