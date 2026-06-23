import { getRuntimeSettings } from "../services/settings/settings";

export const beepSound = () => {
  if (getRuntimeSettings().beep) {
    process.stdout.write("\x07");
  }
};
