import { GameScreen } from "../screens/Game.screen";
import { MenuScreen } from "../screens/Menu.screen";
import { SettingsScreen } from "../screens/Settings.screen";
import { ROUTES, type AppRoute, type Routes } from "./routes";

export const renderRoute = async (route: Routes): Promise<AppRoute> => {
  switch (route) {
    case ROUTES.MENU:
      return MenuScreen();
    case ROUTES.GAME:
      return GameScreen();
    case ROUTES.SETTINGS:
      return SettingsScreen();

    default:
      throw new Error(`Unknown route: ${route satisfies never}`);
  }
};
