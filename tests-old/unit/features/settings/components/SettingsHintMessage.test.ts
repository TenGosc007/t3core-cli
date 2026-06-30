import { beforeEach, describe, expect, it, vi } from "vitest";

import { SettingsHintMessage } from "@/features/settings/components/SettingsHintMessage/SettingsHintMessage";

describe("SettingsHintMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without throwing", () => {
    expect(() => SettingsHintMessage()).not.toThrow();
  });

  it("logs quit hint", () => {
    SettingsHintMessage();
    const calls = vi.mocked(console.log).mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes("main menu"))).toBe(true);
  });

  it("logs option selection hint", () => {
    SettingsHintMessage();
    const calls = vi.mocked(console.log).mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes("Select option"))).toBe(true);
  });
});
