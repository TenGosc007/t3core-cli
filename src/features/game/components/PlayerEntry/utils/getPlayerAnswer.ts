import { UserInput } from "@/components/UserInput";
import { s } from "@/utils/styledLabel";

import { getGame, resetGame } from "../../../services/gameSession";
import {
  validateGameHistoryEntry,
  validatePlayerEntry,
} from "./validatePlayerEntry";

const askPlayer = async (): Promise<string> => {
  const question = s.yellow("Your choice: ");
  return (await UserInput(question.toString())) as string;
};

const handleHistory = async (): Promise<null> => {
  const game = getGame();
  console.log("\t");
  console.log(
    `Back to previous move from 0 to ${game.movesCount} (0 is start from the beginning)`,
  );

  const question = s.yellowBright("Select a nuber: ");
  const answer = await UserInput(question.toString());
  const answerNumeric = Number(answer);

  if (validateGameHistoryEntry(answerNumeric)) {
    game.backToMove(answerNumeric);
    return null;
  }

  return handleHistory();
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

  const answerNumeric = Number(answer) - 1;
  if (validatePlayerEntry(answerNumeric)) {
    return answerNumeric;
  }

  return getPlayerAnswer();
};
