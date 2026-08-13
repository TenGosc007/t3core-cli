import { describe, expect, it } from "vitest";

import { gameInputSchema } from "@/features/Game/validation/gameInputSchema";
import { historyInputSchema } from "@/features/Game/validation/historyInputSchema";
import { settingsInputSchema } from "@/features/Settings/validation/settingsInputSchema";

describe("gameInputSchema", () => {
  it("accepts numbers 1-9", () => {
    for (let i = 1; i <= 9; i++) {
      expect(gameInputSchema.safeParse(i).success).toBe(true);
    }
  });

  it("accepts string numbers", () => {
    expect(gameInputSchema.safeParse("5").success).toBe(true);
  });

  it("accepts 'i' and 'h'", () => {
    expect(gameInputSchema.safeParse("i").success).toBe(true);
    expect(gameInputSchema.safeParse("h").success).toBe(true);
  });

  it("rejects 0 and 10", () => {
    expect(gameInputSchema.safeParse(0).success).toBe(false);
    expect(gameInputSchema.safeParse(10).success).toBe(false);
  });

  it("rejects other letters", () => {
    expect(gameInputSchema.safeParse("x").success).toBe(false);
  });
});

describe("historyInputSchema", () => {
  const schema = historyInputSchema(5);

  it("accepts numbers 0-5", () => {
    for (let i = 0; i <= 5; i++) {
      expect(schema.safeParse(i).success).toBe(true);
    }
  });

  it("rejects number > movesCount", () => {
    expect(schema.safeParse(6).success).toBe(false);
  });

  it("accepts 'i' and 'h'", () => {
    expect(schema.safeParse("i").success).toBe(true);
    expect(schema.safeParse("h").success).toBe(true);
  });
});

describe("settingsInputSchema", () => {
  it("accepts numbers 1 to SETTINGS_OPTIONS.length", () => {
    for (let i = 1; i <= 5; i++) {
      expect(settingsInputSchema.safeParse(i).success).toBe(true);
    }
  });

  it("rejects 0", () => {
    expect(settingsInputSchema.safeParse(0).success).toBe(false);
  });

  it("rejects number > options length", () => {
    expect(settingsInputSchema.safeParse(6).success).toBe(false);
  });
});
