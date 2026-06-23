import { selectEffectiveSettings } from "../services/settings/settings";

export const beepSound = () => {
  if (selectEffectiveSettings().beep) {
    process.stdout.write("\x07");
  }
};
