import { s } from "@/utils/styledLabel";

export const MenuHeader = () => {
  console.log("\t");
  const mainMenuLabel = s.red.bold("MAIN MENU");
  const border = s.yellow.dim("================");
  console.log(`${border} ${mainMenuLabel} ${border}`);
  console.log("\t");
};
