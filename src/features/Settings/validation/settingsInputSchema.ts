import { z } from "zod";

import { SETTINGS_OPTIONS } from "../constants/settingsOptions";

export const settingsInputSchema = z.coerce
  .number()
  .int()
  .min(1)
  .max(SETTINGS_OPTIONS.length);
