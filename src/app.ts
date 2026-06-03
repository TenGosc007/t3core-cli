import { navigateTo } from "./navigation/actions";
import { ROUTES } from "./navigation/routes";

import "./navigation/index";

export const app = () => {
  navigateTo(ROUTES.MENU);
};
