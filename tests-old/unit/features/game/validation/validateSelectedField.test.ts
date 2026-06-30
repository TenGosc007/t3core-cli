import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { describe, expect, it, vi } from "vitest";

import { validateSelectedField } from "@/features/game/validation/validateSelectedField";

const createGame = (isFieldOccupied: boolean) => {
  return {
    isFieldOccupied: vi.fn().mockReturnValue(isFieldOccupied),
  } as unknown as GameEngine;
};

const createGameState = (historyMode: boolean) => {
  const setInputError = vi.fn();
  return { historyMode, setInputError } as unknown as GameStateManager;
};

describe("validateSelectedField", () => {
  it("returns true when history mode is on even if field is occupied", () => {
    const game = createGame(true);
    const gameState = createGameState(true);

    expect(validateSelectedField({ entry: 5, game, index: 4, gameState })).toBe(
      true,
    );
    expect(game.isFieldOccupied).not.toHaveBeenCalled();
    expect(gameState.setInputError).not.toHaveBeenCalled();
  });

  it("returns true when field is not occupied", () => {
    const game = createGame(false);
    const gameState = createGameState(false);

    expect(validateSelectedField({ entry: 5, game, index: 4, gameState })).toBe(
      true,
    );
    expect(gameState.setInputError).not.toHaveBeenCalled();
  });

  it("returns false and sets error when field is occupied", () => {
    const game = createGame(true);
    const gameState = createGameState(false);

    expect(validateSelectedField({ entry: 5, game, index: 4, gameState })).toBe(
      false,
    );
    expect(gameState.setInputError).toHaveBeenCalledWith(
      "Field 5 already selected",
    );
  });

  it("uses entry as index when index is not provided", () => {
    const game = createGame(true);
    const gameState = createGameState(false);

    validateSelectedField({ entry: 5, game, gameState });
    expect(game.isFieldOccupied).toHaveBeenCalledWith(5);
  });
});
