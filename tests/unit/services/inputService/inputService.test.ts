import { describe, expect, it } from "vitest";

import { closeInput } from "@/services/inputService";

describe("inputService", () => {
  describe("closeInput", () => {
    it("does not throw when called repeatedly", () => {
      expect(() => {
        closeInput();
        closeInput();
      }).not.toThrow();
    });
  });
});
