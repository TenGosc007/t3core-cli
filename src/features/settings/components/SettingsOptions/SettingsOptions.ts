import type { SettingsOption } from "../../constants/settingsOptions";

import { isTTYAvailable } from "@/global/tty.global";
import { getSettings } from "@/services/settings/settings";
import { s } from "@/utils/styledLabel";

import { SETTINGS_OPTIONS } from "../../constants/settingsOptions";

const getItemNumber = (
  activeItem: number | string | null | undefined,
  item: SettingsOption,
) => {
  const num = s.yellowBright.bold(item.id);
  return activeItem?.toString() === item.id ? s.inverse(num) : num;
};

const getItemLabel = (item: SettingsOption) => {
  return item.key === "reset"
    ? s.redBright(item.label)
    : s.magentaBright(item.label);
};

const getItemValue = (setting: unknown) => {
  const value =
    typeof setting === "boolean"
      ? setting
        ? s.greenBright("ON")
        : s.redBright("OFF")
      : null;
  return value ? ` - ${value}` : "";
};

export const SettingsOptions = (activeItem?: number | string | null) => {
  const settings = getSettings();

  SETTINGS_OPTIONS.forEach((item) => {
    const itemNumber = getItemNumber(activeItem, item);
    const itemLabel = getItemLabel(item);

    const setting = settings[item.key];
    const itemValue = getItemValue(setting);

    let label = `${itemLabel}${itemValue}`;
    if (item.key === "arrowKeyNavigation" && !isTTYAvailable) {
      label = s.dim(label);
    }

    if (item.key === "reset") console.log("\t");
    console.log(`[${itemNumber}] ${label}`);
  });

  console.log("\t");
};
