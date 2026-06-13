import { Header } from "./components/Header";
import { closeInput } from "./components/UserInput";
import { renderRoute } from "./navigation";
import { ROUTES, type AppRoute } from "./navigation/routes";
import { beepAndDeepClear } from "./utils/beepAndClear";
import { beepSound } from "./utils/beepSound";

export const app = async () => {
  let currentRoute: AppRoute = ROUTES.MENU;

  while (currentRoute !== "exit") {
    beepAndDeepClear();
    Header();
    currentRoute = await renderRoute(currentRoute);
  }

  closeInput();
  beepSound();
  console.log("Exiting the app");
};
