import { beforeEach, describe, expect, it, vi } from "vitest";

import { SettingsEntry } from "@/features/settings/components/SettingsEntry/SettingsEntry";
import { NAV_KEYS } from "@/global/navigationKeys";

vi.mock("@/services/inputService", () => ({
  waitForInput: vi.fn(),
}));

vi.mock("@/features/settings/options", () => ({
  executeSettingsOption: vi.fn(),
  SETTINGS_OPTION_IDS_LABEL: "1-3",
}));

import { executeSettingsOption } from "@/features/settings/options";
import { waitForInput } from "@/services/inputService";

describe("SettingsEntry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns Q when user types q", async () => {
    vi.mocked(waitForInput).mockResolvedValue("q");
    const result = await SettingsEntry();
    expect(result).toBe(NAV_KEYS.Q);
  });

  it("returns null when input is empty", async () => {
    vi.mocked(waitForInput).mockResolvedValue("");
    const result = await SettingsEntry();
    expect(result).toBeNull();
  });

  it("executes valid option and returns null", async () => {
    vi.mocked(waitForInput).mockResolvedValue("1");
    vi.mocked(executeSettingsOption).mockReturnValue(true);
    const result = await SettingsEntry();
    expect(executeSettingsOption).toHaveBeenCalledWith("1");
    expect(result).toBeNull();
  });

  it("logs error for invalid option", async () => {
    vi.mocked(waitForInput).mockResolvedValue("9");
    vi.mocked(executeSettingsOption).mockReturnValue(false);
    await SettingsEntry();
    expect(console.log).toHaveBeenCalled();
  });
});
