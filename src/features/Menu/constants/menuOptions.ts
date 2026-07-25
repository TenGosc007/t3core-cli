import { z } from "zod";

import { ROUTES } from "@/navigation";

export const MENU_OPTIONS = [
  { label: "New Game", route: ROUTES.game },
  { label: "Settings", route: ROUTES.settings },
  { label: "About", route: ROUTES.about },
  { label: "Exit", route: null },
] as const;

export const menuInputSchema = z.coerce
  .number()
  .int()
  .min(1)
  .max(MENU_OPTIONS.length);
