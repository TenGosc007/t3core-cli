import { describe, expect, it } from "vitest";

import type { SettingsOption, SettingsState } from "@/features/Settings/constants/settingsOptions";

import { getSettingsItemDisplay } from "@/features/Settings/components/SettingsItem/getSettingsItemDisplay";

const settings: SettingsState = {
  beep: true,
  arrowNav: true,
  showHistory: false,
};

const toggleOption: SettingsOption = {
  id: 1,
  label: "Sound",
  type: "toggle",
  key: "beep",
};

const commandOption: SettingsOption = {
  id: 4,
  label: "Reset to default",
  type: "command",
  command: "reset",
};

const emphasisOption: SettingsOption = {
  id: 5,
  label: "Back to Menu",
  type: "command",
  command: "back",
  emphasis: true,
};

const disabledOption: SettingsOption = {
  id: 3,
  label: "Show Game History",
  type: "toggle",
  key: "showHistory",
  disabled: () => true,
};

describe("getSettingsItemDisplay", () => {
  it("returns ON for enabled toggle", () => {
    expect(getSettingsItemDisplay(toggleOption, settings, false)).toEqual({
      valueText: "ON",
      color: undefined,
    });
  });

  it("returns OFF for disabled toggle value", () => {
    const offSettings = { ...settings, beep: false };
    expect(getSettingsItemDisplay(toggleOption, offSettings, false)).toEqual({
      valueText: "OFF",
      color: undefined,
    });
  });

  it("returns magenta when selected", () => {
    expect(getSettingsItemDisplay(toggleOption, settings, true)).toEqual({
      valueText: "ON",
      color: "magenta",
    });
  });

  it("returns cyan for emphasis option", () => {
    expect(getSettingsItemDisplay(emphasisOption, settings, false)).toEqual({
      valueText: null,
      color: "cyan",
    });
  });

  it("returns gray when disabled", () => {
    expect(getSettingsItemDisplay(disabledOption, settings, true)).toEqual({
      valueText: "OFF",
      color: "gray",
    });
  });

  it("returns null valueText for command option", () => {
    expect(getSettingsItemDisplay(commandOption, settings, false)).toEqual({
      valueText: null,
      color: undefined,
    });
  });

  it("disabled overrides selected and emphasis", () => {
    expect(getSettingsItemDisplay(emphasisOption, settings, true)).toEqual({
      valueText: null,
      color: "cyan",
    });
  });
});
