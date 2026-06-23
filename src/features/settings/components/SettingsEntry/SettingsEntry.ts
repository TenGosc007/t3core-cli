import type { NavKey } from "@/global/navigationKeys";

import { NAV_KEYS } from "@/global/navigationKeys";
import { waitForInput } from "@/services/inputService";

import { executeSettingsOption } from "../../options";

export const SettingsEntry = async (): Promise<NavKey | null> => {
  const answer = await waitForInput("Enter your choice: ");
  if (answer === "q") return NAV_KEYS.Q;
  if (answer) executeSettingsOption(answer);

  return null;
};
