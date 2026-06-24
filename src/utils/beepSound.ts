import { settingsManager } from "@/services/settings";

export const beepSound = () => {
  const settings = settingsManager.getRuntimeSettings();
  if (settings.beep) {
    process.stdout.write("\x07");
  }
};
