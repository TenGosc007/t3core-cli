import type { SettingsManager } from "@/services/settings";

import { describe, expect, it, vi } from "vitest";

import {
  executeSettingsOption,
  executeSettingsOptionByPosition,
} from "@/features/settings/options";

const createSettingsManager = (overrides: Partial<SettingsManager> = {}) => {
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
    ...overrides,
  } as unknown as SettingsManager;
};

describe("executeSettingsOption", () => {
  it("toggles beep setting", () => {
    const manager = createSettingsManager();

    expect(executeSettingsOption(1, manager)).toBe(true);
    expect(manager.toggleBeep).toHaveBeenCalled();
  });

  it("toggles style setting", () => {
    const manager = createSettingsManager();

    expect(executeSettingsOption(2, manager)).toBe(true);
    expect(manager.toggleStyle).toHaveBeenCalled();
  });

  it("resets settings for command option", () => {
    const manager = createSettingsManager();

    expect(executeSettingsOption(4, manager)).toBe(true);
    expect(manager.resetSettings).toHaveBeenCalled();
  });

  it("returns false for disabled option", () => {
    const manager = createSettingsManager({
      getRuntimeSettings: vi.fn().mockReturnValue({
        beep: true,
        style: false,
        arrowKeyNavigation: false,
      }),
    });

    expect(executeSettingsOption(3, manager)).toBe(false);
    expect(manager.toggleArrowKeyNavigation).not.toHaveBeenCalled();
  });

  it("returns false for unknown id", () => {
    const manager = createSettingsManager();

    expect(executeSettingsOption(99, manager)).toBe(false);
  });
});

describe("executeSettingsOptionByPosition", () => {
  it("executes option at position", () => {
    const manager = createSettingsManager();

    expect(executeSettingsOptionByPosition(0, manager)).toBe(true);
    expect(manager.toggleBeep).toHaveBeenCalled();
  });

  it("returns false for null position", () => {
    const manager = createSettingsManager();

    expect(executeSettingsOptionByPosition(null, manager)).toBe(false);
  });
});
