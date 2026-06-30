import type { Settings } from "@/services/settings";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SettingsOptions } from "@/features/settings/components/SettingsOptions";
import { SETTINGS_OPTIONS } from "@/features/settings/options";

vi.mock("@/utils/styledLabel", () => {
  const identity = (value: string | number) => String(value);
  const handler: ProxyHandler<object> = {
    get: () => proxy,
  };
  const proxy = new Proxy(identity, handler) as unknown as (
    value: string | number,
  ) => string;

  return { s: proxy };
});

describe("SettingsOptions", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("logs all options with current values", () => {
    const settings: Settings = {
      beep: true,
      style: true,
      arrowKeyNavigation: false,
    };

    SettingsOptions({ options: SETTINGS_OPTIONS, settings, activePosition: 0 });

    const logs = consoleSpy.mock.calls.map((call: string[]) => call[0]);
    expect(logs).toContain("[1] Sound - ON");
    expect(logs).toContain("[2] Style - ON");
    expect(logs).toContain("[3] Use Arrow Keys - OFF");
    expect(logs).toContain("[4] Reset to default");
  });

  it("highlights active position", () => {
    const settings: Settings = {
      beep: false,
      style: false,
      arrowKeyNavigation: false,
    };

    SettingsOptions({
      options: SETTINGS_OPTIONS,
      settings,
      activePosition: 2,
    });

    const logs = consoleSpy.mock.calls.map((call: string[]) => call[0]);
    expect(logs[2]).toContain("3");
    expect(logs[2]).toContain("Use Arrow Keys - OFF");
  });

  it("dims disabled options", () => {
    const settings: Settings = {
      beep: true,
      style: false,
      arrowKeyNavigation: false,
    };

    SettingsOptions({ options: SETTINGS_OPTIONS, settings });

    const logs = consoleSpy.mock.calls.map((call: string[]) => call[0]);
    expect(logs).toContain("[3] Use Arrow Keys - OFF");
  });
});
