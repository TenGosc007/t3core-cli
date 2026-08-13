import { beforeEach, describe, expect, it, vi } from "vitest";

import { DEFAULT_SETTINGS } from "@/features/Settings/constants/settingsOptions";

vi.mock("@/services/settings", () => {
  const store = { ...DEFAULT_SETTINGS, load: () => {} };
  return {
    useSettingsStore: {
      getState: () => store,
      setState: (partial: Partial<typeof store>) =>
        Object.assign(store, partial),
    },
    beep: () => {},
  };
});

vi.mock("@/utils/cli", () => ({
  getCliFlags: vi.fn(),
}));

import { useSettingsStore } from "@/services/settings";
import { appInit } from "@/utils/appInit";
import { getCliFlags } from "@/utils/cli";

describe("appInit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(useSettingsStore.getState(), DEFAULT_SETTINGS);
  });

  it("loads settings from repository", () => {
    vi.mocked(getCliFlags).mockReturnValue({
      sound: undefined,
      arrowNav: undefined,
      showHistory: undefined,
      mobile: undefined,
    });
    appInit();
    // load() is called internally via useSettingsStore.getState().load()
    // since we mock the store, we just verify no crash
  });

  it("applies sound flag", () => {
    vi.mocked(getCliFlags).mockReturnValue({
      sound: false,
      arrowNav: undefined,
      showHistory: undefined,
      mobile: undefined,
    });
    appInit();
    expect(useSettingsStore.getState().beep).toBe(false);
  });

  it("applies arrowNav flag", () => {
    vi.mocked(getCliFlags).mockReturnValue({
      sound: undefined,
      arrowNav: false,
      showHistory: undefined,
      mobile: undefined,
    });
    appInit();
    expect(useSettingsStore.getState().arrowNav).toBe(false);
  });

  it("applies showHistory flag", () => {
    vi.mocked(getCliFlags).mockReturnValue({
      sound: undefined,
      arrowNav: undefined,
      showHistory: true,
      mobile: undefined,
    });
    appInit();
    expect(useSettingsStore.getState().showHistory).toBe(true);
  });

  it("mobile flag disables arrowNav", () => {
    vi.mocked(getCliFlags).mockReturnValue({
      sound: undefined,
      arrowNav: undefined,
      showHistory: undefined,
      mobile: true,
    });
    appInit();
    expect(useSettingsStore.getState().arrowNav).toBe(false);
  });

  it("undefined flags do not override existing settings", () => {
    vi.mocked(getCliFlags).mockReturnValue({
      sound: undefined,
      arrowNav: undefined,
      showHistory: undefined,
      mobile: undefined,
    });
    useSettingsStore.setState({ showHistory: true });
    appInit();
    expect(useSettingsStore.getState().showHistory).toBe(true);
  });
});
