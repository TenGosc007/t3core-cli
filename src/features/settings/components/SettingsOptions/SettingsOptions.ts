import type { SettingsOption } from "@/features/settings/options";

import { SETTINGS_OPTIONS } from "@/features/settings/options";
import { getRuntimeSettings } from "@/services/settings";
import { s } from "@/utils/styledLabel";

const getItemNumber = (
  activePosition: number | null | undefined,
  itemPosition: number,
  item: SettingsOption,
) => {
  const id = item.id.toString();
  const num = s.yellowBright.bold(id);
  return activePosition === itemPosition ? s.inverse(num) : num;
};

const getItemLabel = (item: SettingsOption) => {
  return item.emphasis ? s.redBright(item.label) : s.magentaBright(item.label);
};

const getItemValue = (setting: boolean) => {
  return setting ? ` - ${s.greenBright("ON")}` : ` - ${s.redBright("OFF")}`;
};

export const SettingsOptions = (activePosition?: number | null) => {
  const settings = getRuntimeSettings();

  SETTINGS_OPTIONS.forEach((item, itemPosition) => {
    const itemNumber = getItemNumber(activePosition, itemPosition, item);
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
