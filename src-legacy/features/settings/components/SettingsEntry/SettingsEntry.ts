import type { NavKey } from "@/global/navigationKeys";

import {
  executeSettingsOption,
  SETTINGS_OPTION_IDS_LABEL,
} from "@/features/settings/options";
import { NAV_KEYS } from "@/global/navigationKeys";
import { waitForInput } from "@/services/inputService";
import { s } from "@/utils/styledLabel";

export const SettingsEntry = async (): Promise<NavKey | null> => {
  const input = await waitForInput(
    `Enter your choice (${SETTINGS_OPTION_IDS_LABEL}): `,
  );
  const answer = input?.trim().toLowerCase();

  if (answer === "q") return NAV_KEYS.Q;
  if (!answer) return null;

  const wasExecuted = executeSettingsOption(answer);
  if (!wasExecuted) {
    console.log(
      s.red(
        `Invalid or unavailable option. Select one of: ${SETTINGS_OPTION_IDS_LABEL}.`,
      ),
    );
  }

  return null;
};
