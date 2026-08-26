import { ROUTES } from "@/navigation";

export const MENU_OPTIONS = [
  { label: "New Game", route: ROUTES.gameMode },
  { label: "Settings", route: ROUTES.settings },
  { label: "About", route: ROUTES.about },
  { label: "Exit", route: null },
] as const;

export type MenuOption = (typeof MENU_OPTIONS)[number];
