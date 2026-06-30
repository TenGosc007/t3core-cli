import type { SettingsKeyHandlerService } from "@/features/settings/services/settingsKeyHandlerService";
import type { KeyHandler } from "@/services/keyHandlerService";

import { describe, expect, it, vi } from "vitest";

import { SettingsView } from "@/features/settings";
import { ROUTES } from "@/navigation/routes";

import { createSettingsManager } from "../../../helpers/settings";

vi.mock("@/features/settings/components/SettingsHeader", () => ({
  SettingsHeader: vi.fn(),
}));

vi.mock("@/features/settings/components/SettingsHintMessage", () => ({
  SettingsHintMessage: vi.fn(),
}));

vi.mock("@/features/settings/components/SettingsOptions", () => ({
  SettingsOptions: vi.fn(),
}));

vi.mock("@/features/settings/components/SettingsEntry", () => ({
  SettingsEntry: vi.fn().mockResolvedValue("q"),
}));

vi.mock("@/utils/viewUtils", () => ({
  restoreAndClearDown: vi.fn(),
  saveCursor: vi.fn(),
}));

const createKeyHandlerService = (): SettingsKeyHandlerService => {
  const handler = {
    running: false,
    position: 0,
    start: vi.fn(),
    stop: vi.fn(),
    waitForKeyPress: vi.fn().mockResolvedValue(null),
  } as unknown as KeyHandler;

  return {
    getSyncedHandler: vi.fn().mockReturnValue(handler),
    stop: vi.fn(),
  } as unknown as SettingsKeyHandlerService;
};

describe("SettingsView", () => {
  it("returns to menu when user exits", async () => {
    const manager = createSettingsManager();
    const keyHandlerService = createKeyHandlerService();

    const result = await SettingsView({
      settingsManager: manager,
      settingsKeyHandlerService: keyHandlerService,
    });

    expect(result).toBe(ROUTES.MENU);
    expect(keyHandlerService.stop).toHaveBeenCalled();
  });
});
