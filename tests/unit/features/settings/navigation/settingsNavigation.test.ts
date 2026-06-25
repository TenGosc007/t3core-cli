import type { SettingsManager } from "@/services/settings";

import { describe, expect, it, vi } from "vitest";

import { settingsNavigation } from "@/features/settings/navigation/settingsNavigation";
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

describe("settingsNavigation", () => {
  it("moves up in list", () => {
    const manager = createSettingsManager();
    const navigation = settingsNavigation({ settingsManager: manager });

    const result = navigation.handleKey({ key: { name: NAV_KEYS.UP }, position: 2 });
    expect(result).toBe(1);
  });

  it("moves down in list", () => {
    const manager = createSettingsManager();
    const navigation = settingsNavigation({ settingsManager: manager });

    const result = navigation.handleKey({ key: { name: NAV_KEYS.DOWN }, position: 0 });
    expect(result).toBe(1);
  });

  it("stays at top boundary", () => {
    const manager = createSettingsManager();
    const navigation = settingsNavigation({ settingsManager: manager });

    const result = navigation.handleKey({ key: { name: NAV_KEYS.UP }, position: 0 });
    expect(result).toBe(0);
  });

  it("toggles setting on enter", () => {
    const manager = createSettingsManager();
    const navigation = settingsNavigation({ settingsManager: manager });

    const result = navigation.handleKey({ key: { name: NAV_KEYS.ENTER }, position: 0 });
    expect(result).toBe(0);
    expect(manager.toggleBeep).toHaveBeenCalled();
  });

  it("quits on q", () => {
    const manager = createSettingsManager();
    const navigation = settingsNavigation({ settingsManager: manager });

    const result = navigation.handleKey({ key: { name: NAV_KEYS.Q }, position: 0 });
    expect(result).toBe(NAV_KEYS.Q);
  });
});
