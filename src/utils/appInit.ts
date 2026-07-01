import { useSettingsStore } from "@/services/settings";

import { getCliFlags } from "./cli";

export const appInit = () => {
  useSettingsStore.getState().load();

  const flags = getCliFlags();
  if (flags.sound !== undefined) {
    useSettingsStore.setState({ beep: flags.sound });
  }
  if (flags.mobile) {
    useSettingsStore.setState({ arrowKeyNavigation: false });
  }
  if (flags.arrowKey !== undefined) {
    useSettingsStore.setState({ arrowKeyNavigation: flags.arrowKey });
  }
};
