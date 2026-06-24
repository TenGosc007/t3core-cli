import type { GameEngine } from "@/features/game/engine";
import type { NavKey } from "@/global/navigationKeys";

import { validateInputEntry } from "@/features/game/validation/validateInputEntry";
import { waitForInput } from "@/services/inputService";
import { s } from "@/utils/styledLabel";

import { actionKeysHandler } from "./actionKeysHandler";

type GetInputAnswerProps = {
  game: GameEngine;
};

export const getInputAnswer = async ({
  game,
}: GetInputAnswerProps): Promise<number | NavKey | null> => {
  const answer = await waitForInput(s.yellow("Your choice: "));

  const actionKey = actionKeysHandler(answer);
  if (actionKey) return actionKey;

  return validateInputEntry({
    entryProp: parseInt(answer ?? ""),
    game,
    isArrowKeyOn: false,
  });
};
