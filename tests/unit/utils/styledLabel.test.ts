import { afterEach, describe, expect, it, vi } from "vitest";

import { settingsManager } from "@/services/settings";
import { s } from "@/utils/styledLabel";

describe("styledLabel", () => {
  let settingsSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    settingsSpy?.mockRestore();
  });

  it("returns plain text when style is disabled", () => {
    settingsSpy = vi
      .spyOn(settingsManager, "getRuntimeSettings")
      .mockReturnValue({ beep: true, style: false, arrowKeyNavigation: true });

    expect(s.red("hello")).toBe("hello");
  });

  it("returns styled text when style is enabled", () => {
    settingsSpy = vi
      .spyOn(settingsManager, "getRuntimeSettings")
      .mockReturnValue({ beep: true, style: true, arrowKeyNavigation: true });

    expect(s.red("hello")).toContain("hello");
    expect(s.red("hello")).toContain("\x1b[31m");
  });

  it("joins multiple args when called directly as a function", () => {
    const result = (s as unknown as (...args: string[]) => string)(
      "hello",
      "world",
    );
    expect(result).toBe("hello world");
  });

  it("supports chained modifiers", () => {
    settingsSpy = vi
      .spyOn(settingsManager, "getRuntimeSettings")
      .mockReturnValue({ beep: true, style: true, arrowKeyNavigation: true });

    const result = s.red.bold("hello");
    expect(result).toContain("hello");
    expect(result).toContain("\x1b[31;1m");
  });
});
