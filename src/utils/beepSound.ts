import { getSettings } from "../services/settings/settings";

export const beepSound = () => {
  if (getSettings().beep) {
    process.stdout.write("\x07");
  }
};
