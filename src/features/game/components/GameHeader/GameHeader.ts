import { s } from "@/utils/styledLabel";

export const GameHeader = () => {
  console.log("\t");
  const mainMenuLabel = s.red.bold("GAME");
  const border = s.green.dim("===================");
  console.log(`${border} ${mainMenuLabel} ${border}`);
};
