import { describe, expect, it } from "vitest";

import { handleSettingsInput } from "@/features/Settings/hooks/useSettingsInput/handleSettingsInput";

import { makeKey } from "../../../helpers/makeKey";

describe("handleSettingsInput", () => {
  it("returns noop when inactive", () => {
    expect(handleSettingsInput(makeKey({ upArrow: true }), false)).toEqual({
      type: "noop",
    });
  });

  it("returns navigate up on upArrow", () => {
    expect(handleSettingsInput(makeKey({ upArrow: true }), true)).toEqual({
      type: "navigate",
      direction: "up",
    });
  });

  it("returns navigate down on downArrow", () => {
    expect(handleSettingsInput(makeKey({ downArrow: true }), true)).toEqual({
      type: "navigate",
      direction: "down",
    });
  });

  it("returns select on Enter", () => {
    expect(handleSettingsInput(makeKey({ return: true }), true)).toEqual({
      type: "select",
    });
  });

  it("returns noop on other keys", () => {
    expect(handleSettingsInput(makeKey(), true)).toEqual({ type: "noop" });
  });
});
