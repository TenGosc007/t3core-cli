import type { GameEngine, GameManager } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { describe, expect, it, vi } from "vitest";

import { actionKeysHandler } from "@/features/game/components/InputEntry/utils/actionKeysHandler";
import { NAV_KEYS } from "@/global/navigationKeys";

const createGame = (movesCount = 3) => {
  return {
    getMovesCount: vi.fn().mockReturnValue(movesCount),
    makeMove: vi.fn(),
    backToMove: vi.fn(),
    reset: vi.fn(),
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
    ...overrides,
  } as unknown as GameStateManager;
};

describe("actionKeysHandler", () => {
  it("returns null when key is null", () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();

    expect(actionKeysHandler({ key: null, manager, gameState })).toBeNull();
  });

  it("returns null for unrecognized key", () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();

    expect(
      actionKeysHandler({ key: "x", manager, gameState }),
    ).toBeNull();
  });

  it("handles quit key and resets managers", () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();

    const result = actionKeysHandler({ key: NAV_KEYS.Q, manager, gameState });

    expect(result).toBe(NAV_KEYS.Q);
    expect(manager.reset).toHaveBeenCalled();
    expect(gameState.reset).toHaveBeenCalled();
  });

  it("handles escape key as quit", () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();

    const result = actionKeysHandler({
      key: NAV_KEYS.ESCAPE,
      manager,
      gameState,
    });

    expect(result).toBe(NAV_KEYS.Q);
    expect(manager.reset).toHaveBeenCalled();
  });

  it("handles toggle history key when there are moves", () => {
    const game = createGame(3);
    const manager = createManager(game);
    const gameState = createGameState();

    const result = actionKeysHandler({ key: NAV_KEYS.H, manager, gameState });

    expect(result).toBe(NAV_KEYS.H);
    expect(gameState.toggleHistoryMode).toHaveBeenCalled();
  });

  it("handles toggle history key but does not toggle when no moves", () => {
    const game = createGame(0);
    const manager = createManager(game);
    const gameState = createGameState();

    const result = actionKeysHandler({ key: NAV_KEYS.H, manager, gameState });

    expect(result).toBe(NAV_KEYS.H);
    expect(gameState.toggleHistoryMode).not.toHaveBeenCalled();
  });

  it("handles toggle info key", () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();

    const result = actionKeysHandler({ key: NAV_KEYS.I, manager, gameState });

    expect(result).toBe(NAV_KEYS.I);
    expect(gameState.toggleInfo).toHaveBeenCalled();
  });
});
