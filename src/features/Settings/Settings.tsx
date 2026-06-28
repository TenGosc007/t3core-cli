import { Box, Text } from "ink";

import { SettingsItem } from "./components/SettingsItem/SettingsItem";
import { SETTINGS_OPTIONS } from "./constants/settingsOptions";
import { useSettingsInput } from "./hooks/useSettingsInput";

export const Settings = () => {
  const { selectedIndex, settings } = useSettingsInput();

  return (
    <Box flexDirection="column">
      <Text bold color="red">
        SETTINGS
      </Text>
      <Text color="magenta" dimColor>
        =================
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {SETTINGS_OPTIONS.map((option, index) => (
          <SettingsItem
            key={option.id}
            option={option}
            index={index}
            selectedIndex={selectedIndex}
            settings={settings}
          />
        ))}
      </Box>
      <Box marginTop={1}>
        <Text dimColor>↑↓ Navigate · Enter Toggle · q Back to Menu</Text>
      </Box>
    </Box>
  );
};
