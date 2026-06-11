import { beepSound } from "./beepSound";
import { clearConsole } from "./viewUtils";

export const beepAndClear = () => {
  beepSound();
  clearConsole();
};
