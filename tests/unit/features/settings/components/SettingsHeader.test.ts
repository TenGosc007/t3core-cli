import { beforeEach, describe, expect, it, vi } from "vitest";

import { SettingsHeader } from "@/features/settings/components/SettingsHeader/SettingsHeader";

describe("SettingsHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without throwing", () => {
    expect(() => SettingsHeader()).not.toThrow();
  });

  it("logs SETTINGS label", () => {
    SettingsHeader();
    const calls = vi.mocked(console.log).mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes("SETTINGS"))).toBe(true);
  });
});
