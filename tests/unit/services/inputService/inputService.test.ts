import { describe, expect, it } from "vitest";

import {
  closeInput,
  startKeyInput,
  stopKeyInput,
  waitForInput,
} from "@/services/inputService";

describe("inputService", () => {
  describe("closeInput", () => {
    it("does not throw when called repeatedly", () => {
      expect(() => {
        closeInput();
        closeInput();
      }).not.toThrow();
    });
  });

  describe("waitForInput", () => {
    it("returns a promise", () => {
      const result = waitForInput("test: ");
      expect(result).toBeInstanceOf(Promise);
      result?.catch(() => {});
    });
  });

  describe("startKeyInput", () => {
    it("returns false when TTY is not available", () => {
      const result = startKeyInput();
      expect(result).toBe(false);
    });
  });

  describe("stopKeyInput", () => {
    it("does not throw", () => {
      expect(() => stopKeyInput()).not.toThrow();
    });
  });
});
