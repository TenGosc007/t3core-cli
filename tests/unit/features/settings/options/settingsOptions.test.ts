import { describe, expect, it } from "vitest";

import {
  getSettingsOptionById,
  getSettingsOptionByPosition,
  SETTINGS_OPTIONS,
} from "@/features/settings/options";

describe("settingsOptions", () => {
  describe("getSettingsOptionById", () => {
    it("returns option by numeric id", () => {
      const option = getSettingsOptionById(1);

      expect(option).toBe(SETTINGS_OPTIONS[0]);
    });

    it("returns option by string id", () => {
      const option = getSettingsOptionById("3");

      expect(option).toBe(SETTINGS_OPTIONS[2]);
    });

    it("returns null for unknown id", () => {
      expect(getSettingsOptionById(99)).toBeNull();
    });

    it("returns null for null id", () => {
      expect(getSettingsOptionById(null)).toBeNull();
    });
  });

  describe("getSettingsOptionByPosition", () => {
    it("returns option at position", () => {
      expect(getSettingsOptionByPosition(0)).toBe(SETTINGS_OPTIONS[0]);
      expect(getSettingsOptionByPosition(3)).toBe(SETTINGS_OPTIONS[3]);
    });

    it("returns null for out of range position", () => {
      expect(getSettingsOptionByPosition(99)).toBeUndefined();
    });

    it("returns null for non-integer position", () => {
      expect(getSettingsOptionByPosition(1.5)).toBeNull();
    });

    it("returns null for null position", () => {
      expect(getSettingsOptionByPosition(null)).toBeNull();
    });
  });
});
