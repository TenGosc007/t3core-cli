import { z } from "zod";

import { beep } from "@/services/settings";

export type ValidationResult =
  | { type: "success"; value: string }
  | { type: "error"; errors: string[] }
  | { type: "skip" };

export const validateSubmission = (
  input: string,
  validationSchema: z.ZodType<unknown> | undefined,
): ValidationResult => {
  if (!validationSchema) {
    return { type: "success", value: input };
  }

  const result = validationSchema.safeParse(input);
  if (result.success) {
    return { type: "success", value: String(result.data) };
  }

  beep();
  const resultError = z.flattenError(result.error);
  return { type: "error", errors: resultError.formErrors };
};
