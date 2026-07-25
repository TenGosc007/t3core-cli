import { ROUTES } from "@/navigation";

export const MENU_OPTIONS = [
  { label: "New Game", route: ROUTES.game },
  { label: "Settings", route: ROUTES.settings },
  { label: "About", route: ROUTES.about },
  { label: "Exit", route: null },
] as const;
