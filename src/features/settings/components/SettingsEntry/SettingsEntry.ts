import type { AppRoute } from "@/navigation/routes";

import { UserInput } from "@/components/UserInput";
import {
  resetSettings,
  toggleArrowKeyNavigation,
  toggleBeep,
  toggleStyle,
} from "@/services/settings/settings";
import { ROUTES } from "@/navigation/routes";
import { s } from "@/utils/styledLabel";

const entryMessage = () => {
  console.log(s.white("Select option from the list (1-3)"));
  console.log(s.dim('Press "q" to back to the main menu'));
  console.log("\t");
};

const ACTIONS: Record<string, () => void> = {
  "1": toggleBeep,
  "2": toggleStyle,
  "3": toggleArrowKeyNavigation,
  "4": resetSettings,
};

export const SettingsEntry = async (): Promise<AppRoute> => {
  entryMessage();

  const answer = await UserInput("Enter your choice: ");

  if (answer === "q") return ROUTES.MENU;

  ACTIONS[answer]?.();

  return ROUTES.SETTINGS;
};
