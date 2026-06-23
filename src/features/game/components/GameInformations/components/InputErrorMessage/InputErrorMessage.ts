import { gameState } from "@/features/game/services/gameState";
import { s } from "@/utils/styledLabel";

export const InputErrorMessage = () => {
  const error = gameState.inputError;
  if (error != null) {
    console.log(s.red(error));
    console.log("\t");
  }
};
