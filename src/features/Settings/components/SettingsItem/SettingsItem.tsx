import type {
  SettingsOption,
  SettingsState,
} from "../../constants/settingsOptions";

import { Text } from "ink";

type Props = {
  option: SettingsOption;
  settings: SettingsState;
  selected: boolean;
};

export const SettingsItem = ({ option, selected, settings }: Props) => {
  const isDisabled = option.disabled?.(settings) ?? false;

  const getValueText = () => {
    if (option.type !== "toggle" || !option.key) return null;
    const value = settings[option.key];
    return value ? "ON" : "OFF";
  };

  const valueText = getValueText();

  const getLabelColor = () => {
    if (isDisabled) return "gray";
    if (option.emphasis) return "cyan";
    if (selected) return "magenta";
    return undefined;
  };

  return (
    <Text bold={selected} color={getLabelColor()}>
      {option.label}

      {valueText !== null && (
        <Text color={valueText === "ON" ? "green" : "red"}> - {valueText}</Text>
      )}
    </Text>
  );
};
