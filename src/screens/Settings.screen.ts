import { Header } from "../components/Header";
import { SettingsView } from "../features/settings/settings";
import { beepAndClear } from "../utils/beepAndClear";

export const SettingsScreen = () => {
  beepAndClear();
  Header();
  SettingsView();
};
