import type { SettingsStore } from "@/services/settings";

import { Box } from "ink";

import { SETTINGS_OPTIONS } from "../../constants/settingsOptions";
import { SettingsItem } from "../SettingsItem";

type Props = {
  selectedIndex: number;
  settings: SettingsStore;
  arrowNav: boolean;
};

export const SettingsList = ({ selectedIndex, settings, arrowNav }: Props) => {
  return (
    <Box flexDirection="column" marginTop={1}>
      {SETTINGS_OPTIONS.map((option, index) => (
        <SettingsItem
          key={option.id}
          option={option}
          selected={arrowNav && selectedIndex === index}
          settings={settings}
          arrowNav={arrowNav}
          index={index}
        />
      ))}
    </Box>
  );
};
