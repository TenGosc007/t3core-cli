import { Box, Text } from "ink";

import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsList } from "./components/SettingsList";
import { SETTINGS_OPTIONS } from "./constants/settingsOptions";
import { useSettingsInput } from "./hooks/useSettingsInput";

export const SettingsView = () => {
  const { selectedIndex, settings, arrowKeyNavigation } = useSettingsInput();

  return (
    <Box flexDirection="column">
      <SettingsHeader />
      <SettingsList selectedIndex={selectedIndex} settings={settings} />

      <Box marginTop={1}>
        {arrowKeyNavigation ? (
          <Text dimColor>↑↓ Navigate · Enter Toggle</Text>
        ) : (
          <Text dimColor>
            Type 1-{SETTINGS_OPTIONS.length} to toggle · q Back to Menu
          </Text>
        )}
      </Box>
    </Box>
  );
};
