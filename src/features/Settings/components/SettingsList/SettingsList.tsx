import type { SettingsStore } from "@/services/settings";

import { Box } from "ink";

import { SETTINGS_OPTIONS } from "../../constants/settingsOptions";
import { SettingsItem } from "../SettingsItem";

type Props = {
  selectedIndex: number;
  settings: SettingsStore;
};

export const SettingsList = ({ selectedIndex, settings }: Props) => {
  return (
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
  );
};
