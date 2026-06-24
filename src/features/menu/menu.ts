import type { AppRoute } from "@/navigation/routes";

import { MenuEntry } from "@/features/menu/components/MenuEntry";
import { MenuHeader } from "@/features/menu/components/MenuHeader";
import { MenuOptions } from "@/features/menu/components/MenuOptions";

export const MenuView = async (): Promise<AppRoute> => {
  MenuHeader();
  MenuOptions();
  return MenuEntry();
};
