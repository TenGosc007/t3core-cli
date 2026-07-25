import { Box, Text } from "ink";

import { Header } from "@/components/Header";

import { SettingsList } from "./components/SettingsList";
import { SETTINGS_OPTIONS } from "./constants/settingsOptions";
import { useSettingsInput } from "./hooks/useSettingsInput";

export const SettingsView = () => {
  const { selectedIndex, settings, arrowNav } = useSettingsInput();

  return (
    <>
      <Header label="Settings" />

      <SettingsList selectedIndex={selectedIndex} settings={settings} />

      <Box marginTop={1}>
        {arrowNav ? (
          <Text dimColor>↑↓ Navigate · Enter Toggle</Text>
        ) : (
          <Text dimColor>
            Type 1-{SETTINGS_OPTIONS.length} to toggle · q Back to Menu
          </Text>
        )}
      </Box>
    </>
  );
};
