import { z } from "zod";

export const historyInputSchema = (movesCount: number) =>
  z.union([
    z.coerce.number().int().min(0).max(movesCount),
    z.enum(["i", "h"]),
  ]);
