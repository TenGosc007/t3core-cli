import type { SettingsOption } from "./constants/settingsOptions";

import { useCallback } from "react";

import { NavList } from "@/components/NavList";

import { SettingsItem } from "./components/SettingsItem";
import { SETTINGS_OPTIONS } from "./constants/settingsOptions";
import { useSettingsInput } from "./hooks/useSettingsInput";

export const SettingsView = () => {
  const { selectedIndex, settings, arrowNav } = useSettingsInput();

  const renderItem = useCallback(
    (option: SettingsOption, index: number) => (
      <SettingsItem
        option={option}
        selected={arrowNav && index === selectedIndex}
        settings={settings}
      />
    ),
    [arrowNav, selectedIndex, settings],
  );

  return (
    <NavList
      style={{ marginTop: 1 }}
      arrowNav={arrowNav}
      selectedIndex={selectedIndex}
      color="magenta"
      data={SETTINGS_OPTIONS}
      keyExtractor={(option) => option.id}
      renderItem={renderItem}
    />
  );
};
