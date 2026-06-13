import { UserInput } from "@/components/UserInput";
import { getGame } from "@/features/game/services/gameSession";
import { s } from "@/utils/styledLabel";

import { validateGameHistoryEntry } from "./validatePlayerEntry";

export const handleHistory = async (): Promise<null> => {
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
