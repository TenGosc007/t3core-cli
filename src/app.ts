import { navigateTo } from "./navigation/actions";
import { ROUTES } from "./navigation/routes";

export const app = () => {
  navigateTo(ROUTES.MENU);
};
