import { UserInput } from "@/components/UserInput";
import { goToMenu, navigateTo } from "@/navigation/actions";
import { s } from "@/utils/styledLabel";

import { getGame, resetGame } from "../../../services/gameSession";
import {
  validateGameHistoryEntry,
  validatePlayerEntry,
} from "./validatePlayerEntry";

export const getPlayerAnswer = async (): Promise<number | null> => {
  const question = s.yellow("Your choice: ");
  const answer = await UserInput(question.toString());

  if (answer === "q") {
    goToMenu();
    resetGame();
    return null;
  }

  const game = getGame();
  if (answer === "h" && game.movesCount > 0) {
    await showGameHistory();
    return null;
  }

  const answerNumeric = Number(answer) - 1;
  if (validatePlayerEntry(answerNumeric)) {
    return answerNumeric;
  }

  return await getPlayerAnswer();
};

const showGameHistory = async () => {
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
    navigateTo("game");
    return null;
  }

  return await showGameHistory();
};
