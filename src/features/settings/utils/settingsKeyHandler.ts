import type { KeyHandlerProps } from "@/services/keyHandlerService";

import { settingsNavigation } from "../navigation/settingsNavigation";

export const settingsKeyHandler = ({
  key,
  position,
}: Pick<KeyHandlerProps, "key" | "position">) => {
  return settingsNavigation.handleKey({ key, position });
};
