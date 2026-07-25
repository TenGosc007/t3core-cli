import type {
  SettingsOption,
  SettingsState,
} from "../../constants/settingsOptions";

import { Box, Text } from "ink";

type Props = {
  option: SettingsOption;
  settings: SettingsState;
  selected: boolean;
  arrowNav: boolean;
  index: number;
};

export const SettingsItem = ({
  option,
  selected,
  settings,
  arrowNav,
  index,
}: Props) => {
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
    <Box gap={1}>
      <Text color={selected ? "magenta" : undefined}>
        {selected ? "❯" : ""}
      </Text>
      {!arrowNav && (
        <Text>
          [<Text color="magenta">{index + 1}</Text>]
        </Text>
      )}

      <Text bold={selected} color={getLabelColor()}>
        {option.label}

        {valueText !== null && (
          <Text color={valueText === "ON" ? "green" : "red"}>
            {" "}
            - {valueText}
          </Text>
        )}
      </Text>
    </Box>
  );
};
