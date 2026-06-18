import type { NavKey } from "@/global/navigationKeys";

import { NAV_KEYS } from "@/global/navigationKeys";
import { waitForInput } from "@/services/inputService";
import {
  resetSettings,
  toggleArrowKeyNavigation,
  toggleBeep,
  toggleStyle,
} from "@/services/settings/settings";

const ACTIONS: Record<string, () => void> = {
  "1": toggleBeep,
  "2": toggleStyle,
  "3": toggleArrowKeyNavigation,
  "4": resetSettings,
};

export const SettingsEntry = async (): Promise<NavKey | null> => {
  const answer = await waitForInput("Enter your choice: ");
  if (answer === "q") return NAV_KEYS.Q;
  if (answer) ACTIONS[answer]?.();

  return null;
};
