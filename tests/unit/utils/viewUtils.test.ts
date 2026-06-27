import { describe, expect, it, vi } from "vitest";

import {
  hideCursor,
  restoreAndClearDown,
  saveCursor,
  showCursor,
} from "@/utils/viewUtils";

describe("viewUtils", () => {
  it("saveCursor writes ESC save sequence", () => {
    const spy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    saveCursor();
    expect(spy).toHaveBeenCalledWith("\x1b[s");
    spy.mockRestore();
  });

  it("hideCursor writes ESC hide sequence", () => {
    const spy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    hideCursor();
    expect(spy).toHaveBeenCalledWith("\x1b[?25l");
    spy.mockRestore();
  });

  it("showCursor writes ESC show sequence", () => {
    const spy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    showCursor();
    expect(spy).toHaveBeenCalledWith("\x1b[?25h");
    spy.mockRestore();
  });

  it("restoreAndClearDown writes restore then clear sequences", () => {
    const written: string[] = [];
    const spy = vi
      .spyOn(process.stdout, "write")
      .mockImplementation((data) => { written.push(data as string); return true; });
    restoreAndClearDown();
    expect(written).toContain("\x1b[u");
    expect(written).toContain("\x1b[J");
    spy.mockRestore();
  });
});
