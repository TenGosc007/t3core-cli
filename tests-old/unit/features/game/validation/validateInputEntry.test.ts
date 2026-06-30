import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { describe, expect, it, vi } from "vitest";

import { validateInputEntry } from "@/features/game/validation/validateInputEntry";

const createGame = (overrides: Partial<GameEngine> = {}) => {
  return {
    getMovesCount: vi.fn().mockReturnValue(3),
    isFieldOccupied: vi.fn().mockReturnValue(false),
    ...overrides,
  } as unknown as GameEngine;
};

const createGameState = (overrides: Partial<GameStateManager> = {}) => {
  const setInputError = vi.fn();
  return {
    historyMode: false,
    setInputError,
    ...overrides,
  } as unknown as GameStateManager;
};

describe("validateInputEntry", () => {
  it("returns valid entry for normal mode", () => {
    const game = createGame();
    const gameState = createGameState();

    expect(
      validateInputEntry({
        entryProp: 5,
        game,
        isArrowKeyOn: false,
        isInHistoryMode: false,
        gameState,
      }),
    ).toBe(5);
  });

  it("returns null for out of range entry", () => {
    const game = createGame();
    const gameState = createGameState();

    expect(
      validateInputEntry({
        entryProp: 10,
        game,
        isArrowKeyOn: false,
        isInHistoryMode: false,
        gameState,
      }),
    ).toBeNull();
  });

  it("returns null when field is occupied", () => {
    const game = createGame({ isFieldOccupied: vi.fn().mockReturnValue(true) });
    const gameState = createGameState();

    expect(
      validateInputEntry({
        entryProp: 5,
        game,
        isArrowKeyOn: false,
        isInHistoryMode: false,
        gameState,
      }),
    ).toBeNull();
  });

  it("clears input error when gameState is provided", () => {
    const game = createGame();
    const gameState = createGameState();

    validateInputEntry({
      entryProp: 5,
      game,
      isArrowKeyOn: false,
      isInHistoryMode: false,
      gameState,
    });

    expect(gameState.setInputError).toHaveBeenCalledWith(null);
  });

  it("uses 0-based range when history mode is on", () => {
    const game = createGame({
      getMovesCount: vi.fn().mockReturnValue(3),
      isFieldOccupied: vi.fn().mockReturnValue(false),
    });
    const gameState = createGameState({ historyMode: true });

    expect(
      validateInputEntry({
        entryProp: 2,
        game,
        isArrowKeyOn: false,
        isInHistoryMode: true,
        gameState,
      }),
    ).toBe(2);
  });

  it("uses arrow key offset when arrow key navigation is on", () => {
    const game = createGame();
    const gameState = createGameState();

    expect(
      validateInputEntry({
        entryProp: 4,
        game,
        isArrowKeyOn: true,
        isInHistoryMode: false,
        gameState,
      }),
    ).toBe(5);
  });
});
