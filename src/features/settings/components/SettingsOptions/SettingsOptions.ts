import { getSettings } from "@/services/settings/settings";
import { isTTYAvailable } from "@/global/tty.global";
import { s } from "@/utils/styledLabel";

import { SETTINGS_OPTIONS } from "../../constants/settingsOptions";

export const SettingsOptions = () => {
  const settings = getSettings();

  SETTINGS_OPTIONS.forEach((item) => {
    const itemNumber = s.yellowBright.bold(item.id);
    const itemLabel = s.magentaBright(item.label);

    const setting = settings[item.key];

    const value = setting ? s.greenBright("ON") : s.redBright("OFF");

    const itemValue = value ? ` - ${value}` : "";

    let label = `${itemLabel}${itemValue}`;
    if (item.key === "arrowKeyNavigation" && !isTTYAvailable) {
      label = s.dim(label);
    }

    console.log(`[${itemNumber}] ${label}`);
  });

  const resetToDefault = `[${s.yellowBright.bold((SETTINGS_OPTIONS.length + 1).toString())}] ${"Reset to default"}`;

  console.log("\t");
  console.log(resetToDefault);
  console.log("\t");
};
