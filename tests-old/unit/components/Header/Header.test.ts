import { afterEach, describe, expect, it, vi } from "vitest";

import { Header } from "@/components/Header";

describe("Header", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("logs the game header", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    Header();

    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls
      .map((call: string[]) => call[0])
      .join("\n");

    expect(output).toContain("Tic Tac Toe Game");
  });
});
