import type { NavKey } from "@/global/navigationKeys";

import { validateInputEntry } from "@/features/game/validation/validateInputEntry";
import { waitForInput } from "@/services/inputService";
import { s } from "@/utils/styledLabel";

import { actionKeysHandler } from "./actionKeysHandler";

export const getInputAnswer = async (): Promise<number | NavKey | null> => {
  const answer = await waitForInput(s.yellow("Your choice: "));

  const actionKey = actionKeysHandler(answer);
  if (actionKey) return actionKey;

  return validateInputEntry(parseInt(answer ?? ""), false);
};
