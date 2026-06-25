import type { SettingsManager } from "@/services/settings";

import { describe, expect, it, vi } from "vitest";

import { createSettingsKeyHandlerService } from "@/features/settings/services/settingsKeyHandlerService";

vi.mock("@/global/tty.global", () => ({
  isTTYAvailable: false,
}));

const createSettingsManager = (arrowKeyNavigation: boolean) => {
  return {
    getRuntimeSettings: vi.fn().mockReturnValue({
      beep: true,
      style: true,
      arrowKeyNavigation,
    }),
  } as unknown as SettingsManager;
};

describe("createSettingsKeyHandlerService", () => {
  it("returns handler when arrow key navigation is enabled", () => {
    const service = createSettingsKeyHandlerService({
      settingsManager: createSettingsManager(true),
    });

    const handler = service.getSyncedHandler();
    expect(handler).toBeDefined();
    expect(handler.position).toBe(0);
  });

  it("does not start handler when TTY is unavailable", () => {
    const service = createSettingsKeyHandlerService({
      settingsManager: createSettingsManager(true),
    });

    const handler = service.getSyncedHandler();
    expect(handler.running).toBe(false);
  });

  it("stops handler when arrow key navigation is disabled", () => {
    const service = createSettingsKeyHandlerService({
      settingsManager: createSettingsManager(false),
    });

    const handler = service.getSyncedHandler();
    expect(handler.running).toBe(false);
  });

  it("stops the handler", () => {
    const service = createSettingsKeyHandlerService({
      settingsManager: createSettingsManager(true),
    });

    const handler = service.getSyncedHandler();
    service.stop();
    expect(handler.running).toBe(false);
  });
});
