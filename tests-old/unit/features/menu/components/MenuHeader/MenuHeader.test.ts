import { afterEach, describe, expect, it, vi } from "vitest";

import { MenuHeader } from "@/features/menu/components/MenuHeader";

describe("MenuHeader", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("logs the main menu header", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    MenuHeader();

    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls.map((call: string[]) => call[0]).join("\n");

    expect(output).toContain("MAIN MENU");
  });
});
