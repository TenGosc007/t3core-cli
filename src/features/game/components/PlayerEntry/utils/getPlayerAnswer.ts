import { UserInput } from "@/components/UserInput";
import { gameState } from "@/features/game/services/gameState";
import { s } from "@/utils/styledLabel";

import { getGame, resetGame } from "../../../services/gameSession";
import { handleHistory } from "./handleHistory";
import { validatePlayerEntry } from "./validatePlayerEntry";

const askPlayer = async (): Promise<string> => {
  const question = s.yellow("Your choice: ");
  return (await UserInput(question.toString())) as string;
};

export const getPlayerAnswer = async (): Promise<number | "quit" | null> => {
  const answer = await askPlayer();

  if (answer === "q") {
    resetGame();
    return "quit";
  }

  if (answer === "h" && getGame().movesCount > 0) {
    return handleHistory();
  }

  if (answer === "i") {
    gameState.infoToggle();
    return null;
  }

  const answerNumeric = Number(answer) - 1;
  if (validatePlayerEntry(answerNumeric)) {
    return answerNumeric;
  }

  return getPlayerAnswer();
};
