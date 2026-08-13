import type {
  SettingsOption,
  SettingsState,
} from "../../constants/settingsOptions";

import { Text } from "ink";

import { getSettingsItemDisplay } from "./getSettingsItemDisplay";

type Props = {
  option: SettingsOption;
  settings: SettingsState;
  selected: boolean;
};

export const SettingsItem = ({ option, selected, settings }: Props) => {
  const { valueText, color } = getSettingsItemDisplay(
    option,
    settings,
    selected,
  );

  return (
    <Text bold={selected} color={color}>
      {option.label}

      {valueText !== null && (
        <Text color={valueText === "ON" ? "green" : "red"}> - {valueText}</Text>
      )}
    </Text>
  );
};
