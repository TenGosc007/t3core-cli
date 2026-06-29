import { useSettingsStore } from "./useSettingsStore";

const BELL = "\x07";

export const beep = () => {
  if (useSettingsStore.getState().beep) {
    process.stdout.write(BELL);
  }
};
