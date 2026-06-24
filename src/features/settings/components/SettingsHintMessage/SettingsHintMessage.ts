import { SETTINGS_OPTION_IDS_LABEL } from "@/features/settings/options";
import { s } from "@/utils/styledLabel";

export const SettingsHintMessage = () => {
  console.log(
    s.white(`Select option from the list (${SETTINGS_OPTION_IDS_LABEL})`),
  );
  console.log(s.dim('Press "q" to back to the main menu'));
  console.log("\t");
};
