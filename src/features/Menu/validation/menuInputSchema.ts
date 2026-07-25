import { z } from "zod";

import { MENU_OPTIONS } from "../constants/menuOptions";

export const menuInputSchema = z.coerce
  .number()
  .int()
  .min(1)
  .max(MENU_OPTIONS.length);
