import { afterEach, describe, expect, it, vi } from "vitest";

import { beepAndDeepClear } from "@/utils/beepAndClear";

vi.mock("@/utils/beepSound", () => ({
  beepSound: vi.fn(),
}));

describe("beepAndDeepClear", () => {
  let clearSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    clearSpy.mockRestore();
  });

  it("beeps and clears the console twice", () => {
    clearSpy = vi.spyOn(console, "clear").mockImplementation(() => {});

    beepAndDeepClear();

    expect(clearSpy).toHaveBeenCalledTimes(2);
  });
});
