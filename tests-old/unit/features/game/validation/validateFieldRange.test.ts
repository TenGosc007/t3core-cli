import type { GameStateManager } from "@/features/game/services/gameState";

import { describe, expect, it, vi } from "vitest";

import { validateFieldRange } from "@/features/game/validation/validateFieldRange";

const createGameState = () => {
  const setInputError = vi.fn();
  return { setInputError } as unknown as GameStateManager;
};

describe("validateFieldRange", () => {
  it("returns true for valid index", () => {
    const gameState = createGameState();

    expect(validateFieldRange(5, 9, 1, gameState)).toBe(true);
    expect(gameState.setInputError).not.toHaveBeenCalled();
  });

  it("returns true for boundary index equal to range", () => {
    const gameState = createGameState();

    expect(validateFieldRange(9, 9, 1, gameState)).toBe(true);
    expect(gameState.setInputError).not.toHaveBeenCalled();
  });

  it("returns false and sets error for index below start", () => {
    const gameState = createGameState();

    expect(validateFieldRange(0, 9, 1, gameState)).toBe(false);
    expect(gameState.setInputError).toHaveBeenCalledWith(
      "Please enter a valid number (1-9) and press enter",
    );
  });

  it("returns false and sets error for index above range", () => {
    const gameState = createGameState();

    expect(validateFieldRange(10, 9, 1, gameState)).toBe(false);
    expect(gameState.setInputError).toHaveBeenCalledWith(
      "Please enter a valid number (1-9) and press enter",
    );
  });

  it("returns false and sets error for NaN", () => {
    const gameState = createGameState();

    expect(validateFieldRange(NaN, 9, 1, gameState)).toBe(false);
    expect(gameState.setInputError).toHaveBeenCalledWith(
      "Please enter a valid number (1-9) and press enter",
    );
  });
});
