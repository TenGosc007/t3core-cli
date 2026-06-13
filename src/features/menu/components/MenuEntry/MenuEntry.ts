import type { AppRoute } from "@/navigation/routes";

import { UserInput } from "@/components/UserInput";
import { ROUTES } from "@/navigation/routes";

export const MenuEntry = async (): Promise<AppRoute> => {
  console.log("\t");
  const answer = await UserInput("Enter your choice (1-3): ");

  if (answer === "1") {
    return ROUTES.GAME;
  } else if (answer === "2") {
    return ROUTES.SETTINGS;
  } else if (answer === "3") {
    return "exit";
  }
  return ROUTES.MENU;
};
