import { s } from "@/utils/styledLabel";

export const SettingsHeader = () => {
  console.log("\t");
  const mainMenuLabel = s.red.bold("SETTINGS");
  const border = s.magenta.dim("=================");
  console.log(`${border} ${mainMenuLabel} ${border}`);
  console.log("\t");
};
