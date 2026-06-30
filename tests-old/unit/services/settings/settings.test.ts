import { describe, expect, it } from "vitest";

import { SettingsManager } from "@/services/settings/settings";

describe("SettingsManager", () => {
  it("initialises with defaults", () => {
    const manager = new SettingsManager();
    const settings = manager.getRuntimeSettings();
    expect(settings.beep).toBe(true);
    expect(settings.style).toBe(true);
  });

  it("accepts partial initial settings", () => {
    const manager = new SettingsManager({ beep: false });
    expect(manager.getRuntimeSettings().beep).toBe(false);
  });

  it("toggleBeep flips beep", () => {
    const manager = new SettingsManager();
    manager.toggleBeep();
    expect(manager.getRuntimeSettings().beep).toBe(false);
    manager.toggleBeep();
    expect(manager.getRuntimeSettings().beep).toBe(true);
  });

  it("toggleStyle flips style", () => {
    const manager = new SettingsManager();
    manager.toggleStyle();
    expect(manager.getRuntimeSettings().style).toBe(false);
    manager.toggleStyle();
    expect(manager.getRuntimeSettings().style).toBe(true);
  });

  it("toggleArrowKeyNavigation does nothing when style is off", () => {
    const manager = new SettingsManager({ style: false, arrowKeyNavigation: true });
    manager.toggleArrowKeyNavigation();
    expect(manager.getRuntimeSettings().arrowKeyNavigation).toBe(false);
  });

  it("resetSettings restores defaults", () => {
    const manager = new SettingsManager();
    manager.toggleBeep();
    manager.toggleStyle();
    manager.resetSettings();
    expect(manager.getRuntimeSettings().beep).toBe(true);
    expect(manager.getRuntimeSettings().style).toBe(true);
  });

  it("getRuntimeSettings returns arrowKeyNavigation false when style is off", () => {
    const manager = new SettingsManager({ style: false, arrowKeyNavigation: true });
    expect(manager.getRuntimeSettings().arrowKeyNavigation).toBe(false);
  });
});
