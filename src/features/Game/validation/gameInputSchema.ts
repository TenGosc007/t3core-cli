import { z } from "zod";

import { BOARD_LENGTH } from "../constants/gameConstants";

export const gameInputSchema = z.coerce.number().int().min(1).max(BOARD_LENGTH);
