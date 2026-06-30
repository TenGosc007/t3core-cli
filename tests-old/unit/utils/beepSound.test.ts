import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { settingsManager } from "@/services/settings";
import { beepSound } from "@/utils/beepSound";

describe("beepSound", () => {
  let stdoutSpy: ReturnType<typeof vi.spyOn>;
  let settingsSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    stdoutSpy = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);
  });

  afterEach(() => {
    stdoutSpy.mockRestore();
    settingsSpy?.mockRestore();
  });

  it("writes beep character when beep is enabled", () => {
    settingsSpy = vi
      .spyOn(settingsManager, "getRuntimeSettings")
      .mockReturnValue({ beep: true, style: true, arrowKeyNavigation: true });

    beepSound();
    expect(stdoutSpy).toHaveBeenCalledWith("\x07");
  });

  it("does not write beep character when beep is disabled", () => {
    settingsSpy = vi
      .spyOn(settingsManager, "getRuntimeSettings")
      .mockReturnValue({ beep: false, style: true, arrowKeyNavigation: true });

    beepSound();
    expect(stdoutSpy).not.toHaveBeenCalled();
  });
});
