import { z } from "zod";

import { GAME_MODE_OPTIONS } from "../constants/gameModeOptions";

export const gameModeInputSchema = z.coerce
  .number()
  .int()
  .min(1)
  .max(GAME_MODE_OPTIONS.length);
