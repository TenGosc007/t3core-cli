import { SettingsEntry } from "./components/SettingsEntry";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsOptions } from "./components/SettingsOptions";

export const SettingsView = () => {
  SettingsHeader();
  SettingsOptions();
  SettingsEntry();
};
