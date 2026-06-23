import type { KeyHandlerProps } from "@/services/keyHandlerService";

import { gameNavigation } from "../navigation/gameNavigation";

export const gameKeyHandler = (props: KeyHandlerProps) => {
  return gameNavigation.handleKey(props);
};
