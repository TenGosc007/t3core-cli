import type { NavKey } from "@/global/navigationKeys";

import { executeSettingsOption } from "@/features/settings/options";
import { NAV_KEYS } from "@/global/navigationKeys";
import { waitForInput } from "@/services/inputService";

export const SettingsEntry = async (): Promise<NavKey | null> => {
  const input = await waitForInput("Enter your choice: ");
  const answer = input?.trim().toLowerCase();

  if (answer === "q") return NAV_KEYS.Q;
  if (answer) executeSettingsOption(answer);

  return null;
};
