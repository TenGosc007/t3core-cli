import type { SettingsManager } from "@/services/settings";

import { describe, expect, it, vi } from "vitest";

import { ToggleSelectedSettingCommand } from "@/features/settings/navigation/commands/toggleSelectedSettingCommand";
import { NAV_KEYS } from "@/global/navigationKeys";

const createSettingsManager = () => {
  return {
    getRuntimeSettings: vi.fn().mockReturnValue({
      beep: true,
      style: true,
      arrowKeyNavigation: true,
    }),
    resetSettings: vi.fn(),
    toggleBeep: vi.fn(),
    toggleStyle: vi.fn(),
    toggleArrowKeyNavigation: vi.fn(),
  } as unknown as SettingsManager;
};

describe("ToggleSelectedSettingCommand", () => {
  it("handles only enter key", () => {
    const command = new ToggleSelectedSettingCommand(createSettingsManager());

    expect(command.canHandle(NAV_KEYS.ENTER)).toBe(true);
    expect(command.canHandle(NAV_KEYS.UP)).toBe(false);
  });

  it("executes option by position and returns the same position", () => {
    const manager = createSettingsManager();
    const command = new ToggleSelectedSettingCommand(manager);

    expect(command.execute(0)).toBe(0);
    expect(manager.toggleBeep).toHaveBeenCalled();
  });

  it("executes reset command", () => {
    const manager = createSettingsManager();
    const command = new ToggleSelectedSettingCommand(manager);

    command.execute(3);
    expect(manager.resetSettings).toHaveBeenCalled();
  });

  it("does not execute disabled option", () => {
    const manager = {
      ...createSettingsManager(),
      getRuntimeSettings: vi.fn().mockReturnValue({
        beep: true,
        style: false,
        arrowKeyNavigation: false,
      }),
    } as unknown as SettingsManager;
    const command = new ToggleSelectedSettingCommand(manager);

    command.execute(2);
    expect(manager.toggleArrowKeyNavigation).not.toHaveBeenCalled();
  });
});
