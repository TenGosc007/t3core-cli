import type { GameEngine, GameManager } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { describe, expect, it, vi } from "vitest";

import { gameNavigation } from "@/features/game/navigation/gameNavigation";
import { NAV_KEYS } from "@/global/navigationKeys";

const createGame = (overrides: Partial<GameEngine> = {}) => {
  return {
    isGameOver: vi.fn().mockReturnValue(false),
    isFieldOccupied: vi.fn().mockReturnValue(false),
    getMovesCount: vi.fn().mockReturnValue(9),
    makeMove: vi.fn(),
    backToMove: vi.fn(),
    reset: vi.fn(),
    ...overrides,
  } as unknown as GameEngine;
};

const createManager = (game: GameEngine) => {
  return {
    getGame: vi.fn().mockReturnValue(game),
    reset: vi.fn(),
  } as unknown as GameManager;
};

const createGameState = (overrides: Partial<GameStateManager> = {}) => {
  return {
    historyMode: false,
    info: false,
    toggleHistoryMode: vi.fn(),
    toggleInfo: vi.fn(),
    reset: vi.fn(),
    setInputError: vi.fn(),
    ...overrides,
  } as unknown as GameStateManager;
};

describe("gameNavigation", () => {
  it("moves up in grid", () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();
    const navigation = gameNavigation({ manager, gameState });

    const result = navigation.handleKey({
      key: { name: NAV_KEYS.UP },
      position: 4,
    });
    expect(result).toBe(1);
  });

  it("moves right in grid", () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();
    const navigation = gameNavigation({ manager, gameState });

    const result = navigation.handleKey({
      key: { name: NAV_KEYS.RIGHT },
      position: 0,
    });
    expect(result).toBe(1);
  });

  it("selects field on return", () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();
    const navigation = gameNavigation({ manager, gameState });

    const result = navigation.handleKey({
      key: { name: NAV_KEYS.RETURN },
      position: 4,
    });
    expect(result).toBe(4);
    expect(game.makeMove).toHaveBeenCalledWith(4);
  });

  it("toggles history mode on h", () => {
    const game = createGame({ getMovesCount: vi.fn().mockReturnValue(3) });
    const manager = createManager(game);
    const gameState = createGameState();
    const navigation = gameNavigation({ manager, gameState });

    const result = navigation.handleKey({
      key: { name: NAV_KEYS.H },
      position: 0,
    });
    expect(result).toBe(NAV_KEYS.H);
    expect(gameState.toggleHistoryMode).toHaveBeenCalled();
  });

  it("toggles info on i", () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();
    const navigation = gameNavigation({ manager, gameState });

    const result = navigation.handleKey({
      key: { name: NAV_KEYS.I },
      position: 0,
    });
    expect(result).toBe(NAV_KEYS.I);
    expect(gameState.toggleInfo).toHaveBeenCalled();
  });

  it("resets managers on quit", () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();
    const navigation = gameNavigation({ manager, gameState });

    navigation.handleKey({ key: { name: NAV_KEYS.Q }, position: 0 });
    expect(manager.reset).toHaveBeenCalled();
    expect(gameState.reset).toHaveBeenCalled();
  });
});
