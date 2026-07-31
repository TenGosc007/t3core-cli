import type { GameEngine } from "@/features/Game/engine/gameEngine";

import { describe, expect, it } from "vitest";

import { validateMove } from "@/features/Game/validation/validateMove";

const createMockEngine = (
  isFieldSelected: (index: number) => boolean,
): GameEngine =>
  ({
    isFieldSelectedByIndex: isFieldSelected,
  }) as unknown as GameEngine;

describe("validateMove", () => {
  it("returns null when field is not selected and not in history mode", () => {
    const engine = createMockEngine(() => false);
    expect(
      validateMove({ index: 0, game: engine, isHistoryMode: false }),
    ).toBeNull();
  });

  it("returns error when field is already selected (not history mode)", () => {
    const engine = createMockEngine(() => true);
    expect(validateMove({ index: 2, game: engine, isHistoryMode: false })).toBe(
      "Field 3 already selected",
    );
  });

  it("returns null when in history mode even if field is selected", () => {
    const engine = createMockEngine(() => true);
    expect(
      validateMove({ index: 0, game: engine, isHistoryMode: true }),
    ).toBeNull();
  });
});
