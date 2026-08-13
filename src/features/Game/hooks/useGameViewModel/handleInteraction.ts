import type { GameCommands } from "./types";

import { INTERACTION_KEYS } from "../../constants/gameConstants";

export const handleInteraction = (
  input: string,
  commands: Pick<GameCommands, "toggleInfo" | "toggleHistory">,
) => {
  if (input === INTERACTION_KEYS.INFO) commands.toggleInfo();
  if (input === INTERACTION_KEYS.HISTORY) commands.toggleHistory();
};
