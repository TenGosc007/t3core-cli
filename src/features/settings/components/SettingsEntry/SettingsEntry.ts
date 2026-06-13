import type { AppRoute } from "@/navigation/routes";

import { UserInput } from "@/components/UserInput";
import {
  resetSettings,
  toggleBeep,
  toggleStyle,
} from "@/global/settings.global";
import { ROUTES } from "@/navigation/routes";
import { s } from "@/utils/styledLabel";

const entryMessage = () => {
  console.log(s.white("Select option from the list (1-3)"));
  console.log(s.dim('Press "q" to back to the main menu'));
  console.log("\t");
};

export const SettingsEntry = async (): Promise<AppRoute> => {
  entryMessage();

  const answer = await UserInput("Enter your choice: ");

  switch (answer) {
    case "1":
      toggleBeep();
      break;
    case "2":
      toggleStyle();
      break;
    case "3":
      resetSettings();
      break;
    case "q":
      return ROUTES.MENU;
  }

  return ROUTES.SETTINGS;
};
