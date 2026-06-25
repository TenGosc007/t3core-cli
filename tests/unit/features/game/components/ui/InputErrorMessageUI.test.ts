import { beforeEach, describe, expect, it, vi } from "vitest";

import { InputErrorMessageUI } from "@/features/game/components/ui/InputErrorMessageUI/InputErrorMessageUI";

describe("InputErrorMessageUI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logs nothing when error is null", () => {
    InputErrorMessageUI({ error: null });
    expect(console.log).not.toHaveBeenCalled();
  });

  it("logs error message when error is provided", () => {
    InputErrorMessageUI({ error: "Invalid input" });
    const logged = vi.mocked(console.log).mock.calls.map((c) => String(c[0]));
    expect(logged.some((c) => c.includes("Invalid input"))).toBe(true);
  });
});
