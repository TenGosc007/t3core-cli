import { GameView } from "@/features/game";
import { MenuView } from "@/features/menu";
import { SettingsView } from "@/features/settings";

import { ROUTES, type AppRoute, type Routes } from "./routes";

export const renderRoute = async (route: Routes): Promise<AppRoute> => {
  switch (route) {
    case ROUTES.MENU:
      return MenuView();
    case ROUTES.GAME:
      return GameView();
    case ROUTES.SETTINGS:
      return SettingsView();

    default:
      throw new Error(`Unknown route: ${route satisfies never}`);
  }
};
