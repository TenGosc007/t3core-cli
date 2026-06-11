import type { AppRoute } from "../navigation/routes";

import { MenuView } from "../features/menu/menu";

export const MenuScreen = async (): Promise<AppRoute> => {
  return MenuView();
};
