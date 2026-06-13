import type { AppRoute } from "@/navigation/routes";

import { MenuEntry } from "./components/MenuEntry";
import { MenuHeader } from "./components/MenuHeader";
import { MenuOptions } from "./components/MenuOptions";

export const MenuView = async (): Promise<AppRoute> => {
  MenuHeader();
  MenuOptions();
  return MenuEntry();
};
