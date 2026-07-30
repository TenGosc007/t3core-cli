import type { SettingsState } from "../../constants/settingsOptions";

import { Box } from "ink";

import { SETTINGS_OPTIONS } from "../../constants/settingsOptions";
import { SettingsItem } from "../SettingsItem";

type Props = {
  selectedIndex: number;
  settings: SettingsState;
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
