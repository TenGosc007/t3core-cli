import { UserInput } from "@/components/UserInput";
import { gameState } from "@/features/game/services/gameState";
import { s } from "@/utils/styledLabel";

import { getGame, resetGame } from "../../../services/gameSession";
import { validatePlayerEntry } from "./validatePlayerEntry";

const askPlayer = async (): Promise<string> => {
  const question = s.yellow("Your choice: ");
  return (await UserInput(question.toString())) as string;
};

export const getPlayerAnswer = async (): Promise<number | "quit" | null> => {
  const answer = await askPlayer();

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

  const answerNumeric = Number(answer);
  if (validatePlayerEntry(answerNumeric)) {
    return answerNumeric;
  }
  return null;
};
