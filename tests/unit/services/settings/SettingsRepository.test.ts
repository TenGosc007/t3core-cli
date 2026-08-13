import type Conf from "conf";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { createSettingsRepository } from "@/services/settings/SettingsRepository";

type SettingsRecord = Record<string, boolean | string>;

const createMockConf = (initial: Record<string, boolean | string> = {}) => {
  const store = new Map<string, boolean | string>(Object.entries(initial));
  return {
    get: vi.fn((key: string) => store.get(key)),
    set: vi.fn((key: string, value: boolean | string) => {
      store.set(key, value);
    }),
    clear: vi.fn(() => store.clear()),
  } as unknown as Conf<SettingsRecord>;
};

describe("SettingsRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("load returns all settings from conf", () => {
    const conf = createMockConf({
      beep: false,
      arrowNav: false,
      showHistory: true,
    });
    const repo = createSettingsRepository(conf);
    const result = repo.load();
    expect(result).toEqual({
      beep: false,
      arrowNav: false,
      showHistory: true,
    });
  });

  it("save writes all settings to conf", () => {
    const conf = createMockConf();
    const repo = createSettingsRepository(conf);
    repo.save({ beep: true, arrowNav: false, showHistory: true });
    expect(conf.set).toHaveBeenCalledWith("beep", true);
    expect(conf.set).toHaveBeenCalledWith("arrowNav", false);
    expect(conf.set).toHaveBeenCalledWith("showHistory", true);
  });

  it("clear clears the conf store", () => {
    const conf = createMockConf({ beep: true, arrowNav: true });
    const repo = createSettingsRepository(conf);
    repo.clear();
    expect(conf.clear).toHaveBeenCalledTimes(1);
  });
});
