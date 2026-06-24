import { Header } from "@/components/Header";
import { renderRoute } from "@/navigation/renderRoute";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { closeInput } from "@/services/inputService";
import { beepAndDeepClear } from "@/utils/beepAndClear";
import { beepSound } from "@/utils/beepSound";

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
  process.exit(0);
};
