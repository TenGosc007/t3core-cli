import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { describe, expect, it, vi } from "vitest";

import { SelectFieldCommand } from "@/features/game/navigation/commands/selectFieldCommand";
import { NAV_KEYS } from "@/global/navigationKeys";

const createGame = (overrides: Partial<GameEngine> = {}) => {
  return {
    isGameOver: vi.fn().mockReturnValue(false),
    isFieldOccupied: vi.fn().mockReturnValue(false),
    getMovesCount: vi.fn().mockReturnValue(9),
    makeMove: vi.fn(),
    ...overrides,
  } as unknown as GameEngine;
};

const createGameState = (overrides: Partial<GameStateManager> = {}) => {
  const setInputError = vi.fn();
  return {
    historyMode: false,
    setInputError,
    toggleHistoryMode: vi.fn(),
    toggleInfo: vi.fn(),
    reset: vi.fn(),
    ...overrides,
  } as unknown as GameStateManager;
};

describe("SelectFieldCommand", () => {
  it("handles return and space keys", () => {
    const command = new SelectFieldCommand(createGame(), createGameState());

    expect(command.canHandle(NAV_KEYS.RETURN)).toBe(true);
    expect(command.canHandle(NAV_KEYS.SPACE)).toBe(true);
    expect(command.canHandle(NAV_KEYS.UP)).toBe(false);
  });

  it("makes a move when game is not over", () => {
    const game = createGame();
    const gameState = createGameState();
    const command = new SelectFieldCommand(game, gameState);

    expect(command.execute(4)).toBe(4);
    expect(game.makeMove).toHaveBeenCalledWith(4);
  });

  it("returns initial position when game is over", () => {
    const game = createGame({ isGameOver: vi.fn().mockReturnValue(true) });
    const gameState = createGameState();
    const command = new SelectFieldCommand(game, gameState);

    expect(command.execute(4)).toBe(4);
    expect(game.makeMove).not.toHaveBeenCalled();
  });

  it("passes history mode to validation", () => {
    const game = createGame();
    const gameState = createGameState({ historyMode: true });
    const command = new SelectFieldCommand(game, gameState);

    command.execute(2);
    expect(gameState.setInputError).toHaveBeenCalledWith(null);
  });
});
