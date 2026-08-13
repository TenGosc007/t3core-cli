import { describe, expect, it } from "vitest";

import { handleExitInput } from "@/hooks/useExitConfirm/handleExitInput";

describe("handleExitInput", () => {
  it("starts confirm on 'q' at home", () => {
    expect(handleExitInput("q", true, false)).toEqual({ type: "startConfirm" });
  });

  it("does nothing on 'q' away from home", () => {
    expect(handleExitInput("q", false, false)).toEqual({ type: "noop" });
  });

  it("exits on 'y' when confirming", () => {
    expect(handleExitInput("y", true, true)).toEqual({ type: "exit" });
  });

  it("cancels on 'n' when confirming", () => {
    expect(handleExitInput("n", true, true)).toEqual({ type: "cancel" });
  });

  it("does nothing on other input when confirming", () => {
    expect(handleExitInput("x", true, true)).toEqual({ type: "noop" });
  });

  it("does nothing on 'y' when not confirming", () => {
    expect(handleExitInput("y", true, false)).toEqual({ type: "noop" });
  });

  it("does nothing on empty input", () => {
    expect(handleExitInput("", true, false)).toEqual({ type: "noop" });
  });
});
