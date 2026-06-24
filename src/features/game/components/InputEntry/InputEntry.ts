import type { NavKey } from "@/global/navigationKeys";

import { getInputAnswer } from "@/features/game/components/InputEntry/utils/getInputAnswer";
import { handleInputAnswer } from "@/features/game/components/InputEntry/utils/handleInputAnswer";
import { NAV_KEYS } from "@/global/navigationKeys";

export const InputEntry = async (): Promise<NavKey | null | number> => {
  const answer = await getInputAnswer();
  if (answer === NAV_KEYS.Q) return answer;

  return handleInputAnswer(answer);
};
