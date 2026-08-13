import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  DEFAULT_SETTINGS,
  type SettingsState,
} from "@/features/Settings/constants/settingsOptions";
import { createSettingsStore } from "@/services/settings/useSettingsStore";

const createMockRepo = (initial: SettingsState = { ...DEFAULT_SETTINGS }) => {
  let state = { ...initial };
  return {
    load: vi.fn(() => ({ ...state })),
    save: vi.fn((s: SettingsState) => {
      state = { ...s };
    }),
    clear: vi.fn(() => {
      state = { ...DEFAULT_SETTINGS };
    }),
  };
};

describe("useSettingsStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with DEFAULT_SETTINGS", () => {
    const repo = createMockRepo();
    const store = createSettingsStore(repo);
    expect(store.getState()).toMatchObject(DEFAULT_SETTINGS);
  });

  it("toggle flips beep", () => {
    const repo = createMockRepo();
    const store = createSettingsStore(repo);
    store.getState().toggle("beep");
    expect(store.getState().beep).toBe(!DEFAULT_SETTINGS.beep);
  });

  it("toggle flips arrowNav", () => {
    const repo = createMockRepo();
    const store = createSettingsStore(repo);
    store.getState().toggle("arrowNav");
    expect(store.getState().arrowNav).toBe(!DEFAULT_SETTINGS.arrowNav);
  });

  it("toggle flips showHistory", () => {
    const repo = createMockRepo();
    const store = createSettingsStore(repo);
    store.getState().toggle("showHistory");
    expect(store.getState().showHistory).toBe(!DEFAULT_SETTINGS.showHistory);
  });

  it("toggle persists to repository", () => {
    const repo = createMockRepo();
    const store = createSettingsStore(repo);
    store.getState().toggle("showHistory");
    expect(repo.save).toHaveBeenCalledTimes(1);
    expect(repo.save).toHaveBeenCalledWith(
      expect.objectContaining({ showHistory: true }),
    );
  });

  it("reset restores DEFAULT_SETTINGS and persists", () => {
    const repo = createMockRepo();
    const store = createSettingsStore(repo);
    store.getState().toggle("beep");
    store.getState().toggle("showHistory");
    store.getState().reset();
    expect(store.getState()).toMatchObject(DEFAULT_SETTINGS);
    expect(repo.save).toHaveBeenCalledWith(DEFAULT_SETTINGS);
  });

  it("load reads from repository", () => {
    const repo = createMockRepo({
      beep: false,
      arrowNav: false,
      showHistory: true,
    });
    const store = createSettingsStore(repo);
    store.getState().load();
    expect(store.getState().beep).toBe(false);
    expect(store.getState().arrowNav).toBe(false);
    expect(store.getState().showHistory).toBe(true);
  });
});
