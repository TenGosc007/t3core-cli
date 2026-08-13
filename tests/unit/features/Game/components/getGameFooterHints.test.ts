import { describe, expect, it } from "vitest";

import { getGameFooterHints } from "@/features/Game/components/GameFooter/getGameFooterHints";

describe("getGameFooterHints", () => {
  it("returns field selection hint when history is off", () => {
    const { hints } = getGameFooterHints(3, false, false);
    expect(hints[0]).toBe("Select the number of the field (1-9)");
  });

  it("returns field selection hint when showHistory is undefined", () => {
    const { hints } = getGameFooterHints(3, false);
    expect(hints[0]).toBe("Select the number of the field (1-9)");
  });

  it("does not include history toggle hint when showHistory is false", () => {
    const { hints } = getGameFooterHints(3, false, false);
    expect(hints).not.toContainEqual(expect.stringContaining("history"));
  });

  it("includes history toggle hint when showHistory is true and moves > 0", () => {
    const { hints } = getGameFooterHints(3, false, true);
    expect(hints).toContainEqual("h Show history");
  });

  it("does not include history toggle hint when movesCount is 0", () => {
    const { hints } = getGameFooterHints(0, false, true);
    expect(hints).not.toContainEqual(expect.stringContaining("history"));
  });

  it("shows Hide history when historyMode is on and showHistory is true", () => {
    const { hints } = getGameFooterHints(3, true, true);
    expect(hints).toContainEqual("h Hide history");
  });

  it("shows history select hint when historyMode is on and showHistory is true", () => {
    const { hints } = getGameFooterHints(5, true, true);
    expect(hints[0]).toBe(
      "Select previous move (0-5). 0 is start from the beginning",
    );
  });

  it("does not show history select hint when historyMode is on but showHistory is false", () => {
    const { hints } = getGameFooterHints(5, true, false);
    expect(hints[0]).toBe("Select the number of the field (1-9)");
  });

  it("always includes exit hint", () => {
    const { hints } = getGameFooterHints(0, false, false);
    expect(hints).toContain("esc Back to Menu");
  });

  it("arrowNavHints shows navigate history when in history mode with showHistory", () => {
    const { arrowNavHints } = getGameFooterHints(3, true, true);
    expect(arrowNavHints).toContain("↑↓ Navigate history");
    expect(arrowNavHints).toContain("Enter Select move");
  });

  it("arrowNavHints shows normal navigation when not in history mode", () => {
    const { arrowNavHints } = getGameFooterHints(3, false, true);
    expect(arrowNavHints).toContain("↑↓ Use arrow keys to navigate");
  });

  it("arrowNavHints shows normal navigation when showHistory is false even if historyMode is true", () => {
    const { arrowNavHints } = getGameFooterHints(3, true, false);
    expect(arrowNavHints).toContain("↑↓ Use arrow keys to navigate");
  });
});
