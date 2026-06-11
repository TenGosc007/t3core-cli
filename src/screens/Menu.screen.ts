import type { AppRoute } from "../navigation/routes";

import { Header } from "../components/Header";
import { MenuEntry } from "../features/menu/components/MenuEntry";
import { MenuHeader } from "../features/menu/components/MenuHeader";
import { MenuOptions } from "../features/menu/components/MenuOptions";
import { beepAndClear } from "../utils/beepAndClear";

export const MenuScreen = async (): Promise<AppRoute> => {
  beepAndClear();
  Header();
  MenuHeader();
  MenuOptions();
  return MenuEntry();
};
