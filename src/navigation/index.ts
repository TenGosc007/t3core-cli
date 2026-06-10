import { GameScreen } from "../screens/Game.screen";
import { MenuScreen } from "../screens/Menu.screen";
import { SettingsScreen } from "../screens/Settings.screen";
import { registerNavigation } from "./actions";
import { ROUTES, type Routes } from "./routes";

const navigateTo = (route: Routes) => {
  switch (route) {
    case ROUTES.MENU:
      MenuScreen();
      break;
    case ROUTES.GAME:
      GameScreen();
      break;
    case ROUTES.SETTINGS:
      SettingsScreen();
      break;

    default:
      throw new Error(`Unknown route: ${route satisfies never}`);
  }
};

const goToMenu = () => {
  return navigateTo(ROUTES.MENU);
};

registerNavigation({ navigateTo, goToMenu });
