import type { SettingsState } from "../../constants/settingsOptions";

import { NavList } from "@/components/NavList";

import { SETTINGS_OPTIONS } from "../../constants/settingsOptions";
import { SettingsItem } from "../SettingsItem";

type Props = {
  selectedIndex: number;
  settings: SettingsState;
  arrowNav: boolean;
};

export const SettingsList = ({ selectedIndex, settings, arrowNav }: Props) => {
  return (
    <NavList
      style={{ marginTop: 1 }}
      arrowNav={arrowNav}
      selectedIndex={selectedIndex}
      color="magenta"
      data={SETTINGS_OPTIONS}
      keyExtractor={(option) => option.id}
      renderItem={(option, index) => (
        <SettingsItem
          option={option}
          selected={arrowNav && index === selectedIndex}
          settings={settings}
        />
      )}
    />
  );
};
