import { beepSound } from "./beepSound";
import { clearConsole } from "./viewUtils";

export const beepAndDeepClear = () => {
  beepSound();
  console.clear();
  console.clear();
};

export const beepAndClear = () => {
  beepSound();
  clearConsole();
};
