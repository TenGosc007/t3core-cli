import { s } from "@/utils/styledLabel";

import { gameState } from "../../services/gameState";

export const InputErrorMessage = () => {
  const error = gameState.inputError;
  if (error != null) {
    console.log(s.red(error));
    console.log("\t");
  }
};
