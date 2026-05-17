import { navigateTo } from "./navigation";
import { ROUTES } from "./navigation/routes";

export const app = () => {
  navigateTo(ROUTES.MENU);
};
