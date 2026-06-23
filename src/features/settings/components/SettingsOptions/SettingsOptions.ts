import type { SettingsOption } from "../../options";

import { getSettings } from "@/services/settings/settings";
import { s } from "@/utils/styledLabel";

import { SETTINGS_OPTIONS } from "../../options";

const getItemNumber = (
  activeItem: number | string | null | undefined,
  item: SettingsOption,
) => {
  const id = item.id.toString();
  const num = s.yellowBright.bold(id);
  return activeItem?.toString() === id ? s.inverse(num) : num;
};

const getItemLabel = (item: SettingsOption) => {
  return item.emphasis ? s.redBright(item.label) : s.magentaBright(item.label);
};

const getItemValue = (setting: boolean) => {
  return setting ? ` - ${s.greenBright("ON")}` : ` - ${s.redBright("OFF")}`;
};

export const SettingsOptions = (activeItem?: number | string | null) => {
  const settings = getSettings();

  SETTINGS_OPTIONS.forEach((item) => {
    const itemNumber = getItemNumber(activeItem, item);
    const itemLabel = getItemLabel(item);
    const itemValue =
      item.type === "toggle" ? getItemValue(settings[item.key]) : "";

    let label = `${itemLabel}${itemValue}`;
    if (item.disabled?.(settings)) {
      label = s.dim(label);
    }

    if (item.type === "command") console.log("\t");
    console.log(`[${itemNumber}] ${label}`);
  });

  console.log("\t");
};
