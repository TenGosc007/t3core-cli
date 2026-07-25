import { SettingsList } from "./components/SettingsList";
import { useSettingsInput } from "./hooks/useSettingsInput";

export const SettingsView = () => {
  const { selectedIndex, settings } = useSettingsInput();

  return <SettingsList selectedIndex={selectedIndex} settings={settings} />;
};
