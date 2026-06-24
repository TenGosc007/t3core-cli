import { s } from "@/utils/styledLabel";

export const GameHeaderUI = () => {
  console.log("\t");
  const mainMenuLabel = s.red.bold("GAME");
  const border = s.green.dim("===================");
  console.log(`${border} ${mainMenuLabel} ${border}`);
};
