import { useSettingsStore } from "@/services/settings";

import { getCliFlags } from "./cli";

export const appInit = () => {
  useSettingsStore.getState().load();

  const flags = getCliFlags();
  if (flags.sound !== undefined) {
    useSettingsStore.setState({ beep: flags.sound });
  }
  if (flags.arrowNav !== undefined) {
    useSettingsStore.setState({ arrowNav: flags.arrowNav });
  }
  if (flags.mobile) {
    useSettingsStore.setState({ arrowNav: false });
  }
};
