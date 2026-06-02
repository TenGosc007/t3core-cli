import { UserInput } from "@/components/UserInput";
import { goToMenu } from "@/navigation";
import { styledLabel } from "@/utils/styledLabel";

import { resetGame } from "../../../services/gameSession";
import { validatePlayerEntry } from "./validatePlayerEntry";

export const getPlayerAnswer = async (): Promise<number | null> => {
  const question = styledLabel("Your choice: ", {
    color: "yellow",
  });
  const answer = await UserInput(question.toString());

  if (answer === "q") {
    goToMenu();
    resetGame();
    return null;
  }

  const answerNumeric = Number(answer) - 1;
  if (validatePlayerEntry(answerNumeric)) {
    return answerNumeric;
  }

  return await getPlayerAnswer();
};
