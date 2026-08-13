import type { SettingsOption, SettingsState } from "../../constants/settingsOptions";

export type SettingsItemDisplay = {
  valueText: string | null;
  color: "gray" | "cyan" | "magenta" | undefined;
};

export const getSettingsItemDisplay = (
  option: SettingsOption,
  settings: SettingsState,
  selected: boolean,
): SettingsItemDisplay => {
  const isDisabled = option.disabled?.(settings) ?? false;

  const valueText =
    option.type === "toggle" && option.key
      ? settings[option.key]
        ? "ON"
        : "OFF"
      : null;

  const color = isDisabled
    ? "gray"
    : option.emphasis
      ? "cyan"
      : selected
        ? "magenta"
        : undefined;

  return { valueText, color };
};
