import type { NavKey } from "@/global/navigationKeys";

import { NAV_KEYS } from "@/global/navigationKeys";

import { getInputAnswer } from "./utils/getInputAnswer";
import { handleInputAnswer } from "./utils/handleInputAnswer";

export const InputEntry = async (): Promise<NavKey | null | number> => {
  const answer = await getInputAnswer();
  if (answer === NAV_KEYS.Q) return answer;

  return handleInputAnswer(answer);
};
