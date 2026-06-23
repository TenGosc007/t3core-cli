import { s } from "@/utils/styledLabel";

import { SETTINGS_OPTIONS } from "../../options";

export const SettingsHintMessage = () => {
  console.log(
    s.white(`Select option from the list (1-${SETTINGS_OPTIONS.length})`),
  );
  console.log(s.dim('Press "q" to back to the main menu'));
  console.log("\t");
};
