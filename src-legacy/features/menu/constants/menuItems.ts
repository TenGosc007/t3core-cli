import { ROUTES, type AppRoute } from "@/navigation/routes";

export type MenuItem = {
  id: string;
  label: string;
  route: AppRoute;
};

export const MENU_ITEMS: readonly MenuItem[] = [
  { id: "1", label: "New Game", route: ROUTES.GAME },
  { id: "2", label: "Settings", route: ROUTES.SETTINGS },
  { id: "3", label: "Exit", route: "exit" },
];
