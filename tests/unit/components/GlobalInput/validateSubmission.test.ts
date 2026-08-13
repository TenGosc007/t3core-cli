import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { validateSubmission } from "@/components/GlobalInput/validateSubmission";
import { beep } from "@/services/settings";

vi.mock("@/services/settings", () => ({
  beep: vi.fn(),
}));

const schema = z.coerce.number().int().min(1).max(9);

describe("validateSubmission", () => {
  it("returns success with input when no schema", () => {
    expect(validateSubmission("abc", undefined)).toEqual({
      type: "success",
      value: "abc",
    });
  });

  it("returns success with coerced data when valid", () => {
    expect(validateSubmission("5", schema)).toEqual({
      type: "success",
      value: "5",
    });
  });

  it("beeps and returns error when invalid", () => {
    const result = validateSubmission("0", schema);
    expect(result.type).toBe("error");
    expect(beep).toHaveBeenCalled();
    if (result.type === "error") {
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });

  it("returns error for non-numeric input", () => {
    const result = validateSubmission("abc", schema);
    expect(result.type).toBe("error");
  });

  it("does not beep when no schema", () => {
    vi.mocked(beep).mockClear();
    validateSubmission("abc", undefined);
    expect(beep).not.toHaveBeenCalled();
  });
});
