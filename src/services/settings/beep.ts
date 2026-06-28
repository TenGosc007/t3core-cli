import { useSettingsStore } from "./useSettingsStore";

export const beep = () => {
  if (useSettingsStore.getState().beep) {
    process.stdout.write("\x07");
  }
};
