import type {
  SettingsOption,
  SettingsState,
} from "../../constants/settingsOptions";

import { Box, Text } from "ink";

type Props = {
  option: SettingsOption;
  index: number;
  selectedIndex: number;
  settings: SettingsState;
};

export const SettingsItem = ({
  option,
  index,
  selectedIndex,
  settings,
}: Props) => {
  const isSelected = index === selectedIndex;
  const isDisabled = option.disabled?.(settings) ?? false;

  const getValueText = () => {
    if (option.type !== "toggle" || !option.key) return null;
    const value = settings[option.key];
    return value ? "ON" : "OFF";
  };

  const valueText = getValueText();

  return (
    <Box gap={1} marginTop={option.space ? 1 : 0}>
      <Text color={isSelected ? "magenta" : undefined}>
        {isSelected ? "❯" : " "}
      </Text>
      {/* <Text color="yellow">{option.id}</Text> */}
      <Text
        bold={isSelected}
        color={
          isDisabled
            ? "gray"
            : option.emphasis
              ? "cyan"
              : isSelected
                ? "magenta"
                : undefined
        }
      >
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
