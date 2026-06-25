import { describe, expect, it } from "vitest";

import { disableRawMode, enableRawMode } from "@/utils/rawMode";

describe("rawMode", () => {
  it("enableRawMode returns false when stdin is not a TTY", () => {
    const original = process.stdin.isTTY;
    Object.defineProperty(process.stdin, "isTTY", {
      value: false,
      configurable: true,
    });
    const result = enableRawMode();
    expect(result).toBe(false);
    Object.defineProperty(process.stdin, "isTTY", {
      value: original,
      configurable: true,
    });
  });

  it("disableRawMode returns false when stdin is not a TTY", () => {
    const original = process.stdin.isTTY;
    Object.defineProperty(process.stdin, "isTTY", {
      value: false,
      configurable: true,
    });
    const result = disableRawMode();
    expect(result).toBe(false);
    Object.defineProperty(process.stdin, "isTTY", {
      value: original,
      configurable: true,
    });
  });

  it("enableRawMode returns false in non-TTY test environment", () => {
    expect(enableRawMode()).toBe(false);
  });

  it("disableRawMode returns false in non-TTY test environment", () => {
    expect(disableRawMode()).toBe(false);
  });
});
