import { UserInput } from "@/components/UserInput";
import {
  resetSettings,
  toggleBeep,
  toggleStyle,
} from "@/global/settings.global";
import { goToMenu, navigateTo } from "@/navigation";
import { ROUTES } from "@/navigation/routes";
import { styledLabel } from "@/utils/styledLabel";

const entryMessage = () => {
  console.log(
    `${styledLabel("Select option from the list (1-4)", { color: "white" })}`,
  );
  console.log(
    `${styledLabel('Press "q" to back to the main menu', { textStyle: "dim" })}`,
  );
  console.log("\t");
};

export const SettingsEntry = async () => {
  entryMessage();

  const answer = await UserInput("Enter your choice: ");
  console.log(answer);

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
      return goToMenu();
  }

  navigateTo(ROUTES.SETTINGS);
};
