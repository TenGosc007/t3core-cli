import { describe, expect, it } from "vitest";

import {
  DEFAULT_SETTINGS,
  SETTINGS_KEYS,
  SETTINGS_OPTIONS,
  type SettingsState,
} from "@/features/Settings/constants/settingsOptions";

describe("settingsOptions", () => {
  it("SETTINGS_KEYS contains beep, arrowNav, showHistory", () => {
    expect(SETTINGS_KEYS).toEqual({
      beep: "beep",
      arrowNav: "arrowNav",
      showHistory: "showHistory",
    });
  });

  it("DEFAULT_SETTINGS has beep=true, arrowNav=true, showHistory=false", () => {
    expect(DEFAULT_SETTINGS).toEqual({
      beep: true,
      arrowNav: true,
      showHistory: false,
    });
  });

  it("SETTINGS_OPTIONS has toggle for each key plus commands", () => {
    const toggleKeys = SETTINGS_OPTIONS.filter(
      (o): o is typeof o & { key: string } => o.type === "toggle",
    ).map((o) => o.key);
    expect(toggleKeys).toEqual(["beep", "arrowNav", "showHistory"]);
  });

  it("SETTINGS_OPTIONS has Reset and Back to Menu commands", () => {
    const commands = SETTINGS_OPTIONS.filter((o) => o.type === "command");
    expect(commands).toHaveLength(2);
    expect(commands[0].label).toBe("Reset to default");
    expect(commands[1].label).toBe("Back to Menu");
    expect(commands[1].emphasis).toBe(true);
  });

  it("SettingsState is a record of boolean for all keys", () => {
    const state: SettingsState = { ...DEFAULT_SETTINGS };
    for (const key of Object.keys(SETTINGS_KEYS)) {
      expect(typeof state[key as keyof SettingsState]).toBe("boolean");
    }
  });
});
