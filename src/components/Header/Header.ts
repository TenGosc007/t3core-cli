import { s } from "@/utils/styledLabel";

export const Header = () => {
  console.log(`\t`);
  const gameName = s.yellow.bold("Tic Tac Toe Game");
  const border = s.red("============================================");
  const sideBorder = s.red("|");

  const headerLabel = `${border} 
${sideBorder}             ${gameName}             ${sideBorder} 
${border}`;
  console.log(headerLabel);
  console.log("\t");
};
