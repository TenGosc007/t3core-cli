import type { SettingsManager } from "@/services/settings";

import { vi } from "vitest";

export const createSettingsManager = (): SettingsManager => {
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
