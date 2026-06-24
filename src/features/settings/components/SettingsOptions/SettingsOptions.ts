import type { SettingsOption } from "@/features/settings/options";
import type { Settings } from "@/services/settings";

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

type SettingsOptionsProps = {
  options: readonly SettingsOption[];
  settings: Settings;
  activePosition?: number | null;
};

export const SettingsOptions = ({
  options,
  settings,
  activePosition,
}: SettingsOptionsProps) => {
  const lines: string[] = [];

  options.forEach((item, itemPosition) => {
    const itemNumber = getItemNumber(activePosition, itemPosition, item);
    const itemLabel = getItemLabel(item);
    const itemValue =
      item.type === "toggle" ? getItemValue(settings[item.key]) : "";

    let label = `${itemLabel}${itemValue}`;
    if (item.disabled?.(settings)) {
      label = s.dim(label);
    }

    if (item.type === "command") lines.push("\t");
    lines.push(`[${itemNumber}] ${label}`);
  });

  lines.push("\t");
  lines.forEach((line) => console.log(line));
};
