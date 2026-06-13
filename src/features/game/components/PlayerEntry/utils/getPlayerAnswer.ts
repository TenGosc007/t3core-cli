import { UserInput } from "@/components/UserInput";
import { gameState } from "@/features/game/services/gameState";
import { s } from "@/utils/styledLabel";

import { getGame, resetGame } from "../../../services/gameSession";
import { validatePlayerEntry } from "./validatePlayerEntry";

export const getPlayerAnswer = async (): Promise<number | "quit" | null> => {
  const answer = await UserInput(s.yellow("Your choice: "));

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
