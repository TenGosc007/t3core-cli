import { describe, expect, it, vi } from "vitest";

import type {
  SettingsOption,
  SettingsState,
} from "@/features/Settings/constants/settingsOptions";

import { handleSettingsOption } from "@/features/Settings/hooks/useSettingsToggleOption/handleSettingsOption";

const makeCommands = () => ({
  toggle: vi.fn(),
  reset: vi.fn(),
  navigate: vi.fn(),
});

const defaultSettings: SettingsState = {
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

const resetOption: SettingsOption = {
  id: 4,
  label: "Reset to default",
  type: "command",
  command: "reset",
};

const backOption: SettingsOption = {
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

describe("handleSettingsOption", () => {
  it("toggles a toggle option", () => {
    const commands = makeCommands();
    handleSettingsOption(toggleOption, defaultSettings, commands);
    expect(commands.toggle).toHaveBeenCalledWith("beep");
    expect(commands.reset).not.toHaveBeenCalled();
    expect(commands.navigate).not.toHaveBeenCalled();
  });

  it("resets on reset command", () => {
    const commands = makeCommands();
    handleSettingsOption(resetOption, defaultSettings, commands);
    expect(commands.reset).toHaveBeenCalledTimes(1);
    expect(commands.toggle).not.toHaveBeenCalled();
    expect(commands.navigate).not.toHaveBeenCalled();
  });

  it("navigates home on back command", () => {
    const commands = makeCommands();
    handleSettingsOption(backOption, defaultSettings, commands);
    expect(commands.navigate).toHaveBeenCalledWith("/");
    expect(commands.reset).not.toHaveBeenCalled();
    expect(commands.toggle).not.toHaveBeenCalled();
  });

  it("does nothing when option is undefined", () => {
    const commands = makeCommands();
    handleSettingsOption(undefined, defaultSettings, commands);
    expect(commands.toggle).not.toHaveBeenCalled();
    expect(commands.reset).not.toHaveBeenCalled();
    expect(commands.navigate).not.toHaveBeenCalled();
  });

  it("does nothing when option is disabled", () => {
    const commands = makeCommands();
    handleSettingsOption(disabledOption, defaultSettings, commands);
    expect(commands.toggle).not.toHaveBeenCalled();
    expect(commands.reset).not.toHaveBeenCalled();
    expect(commands.navigate).not.toHaveBeenCalled();
  });

  it("respects disabled based on settings state", () => {
    const commands = makeCommands();
    const conditionalDisabled: SettingsOption = {
      id: 2,
      label: "Use Arrow Keys",
      type: "toggle",
      key: "arrowNav",
      disabled: (s) => !s.arrowNav,
    };
    handleSettingsOption(
      conditionalDisabled,
      { ...defaultSettings, arrowNav: false },
      commands,
    );
    expect(commands.toggle).not.toHaveBeenCalled();
  });

  it("allows toggle when disabled returns false", () => {
    const commands = makeCommands();
    const conditionalDisabled: SettingsOption = {
      id: 2,
      label: "Use Arrow Keys",
      type: "toggle",
      key: "arrowNav",
      disabled: (s) => !s.arrowNav,
    };
    handleSettingsOption(conditionalDisabled, defaultSettings, commands);
    expect(commands.toggle).toHaveBeenCalledWith("arrowNav");
  });
});
