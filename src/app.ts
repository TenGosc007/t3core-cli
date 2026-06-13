import { Header } from "./components/Header";
import { closeInput } from "./components/UserInput";
import { renderRoute } from "./navigation";
import { ROUTES, type AppRoute } from "./navigation/routes";
import { beepAndClear } from "./utils/beepAndClear";
import { beepSound } from "./utils/beepSound";

export const app = async () => {
  let currentRoute: AppRoute = ROUTES.MENU;

  while (currentRoute !== "exit") {
    beepAndClear();
    Header();
    currentRoute = await renderRoute(currentRoute);
  }

  closeInput();
  beepSound();
  console.log("Exiting the app");
};
