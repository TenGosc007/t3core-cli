import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";
import type { KeyHandler } from "@/services/keyHandlerService";

import { describe, expect, it, vi } from "vitest";

import { handleInputAnswer } from "@/features/game/components/InputEntry/utils/handleInputAnswer";

const createGame = (overrides: Partial<GameEngine> = {}) => {
  return {
    makeMove: vi.fn(),
    backToMove: vi.fn(),
    ...overrides,
  } as unknown as GameEngine;
};

const createGameState = (overrides: Partial<GameStateManager> = {}) => {
  return {
    historyMode: false,
    toggleHistoryMode: vi.fn(),
    ...overrides,
  } as unknown as GameStateManager;
};

const createKeyHandler = (running: boolean) => {
  return { running } as unknown as KeyHandler;
};

describe("handleInputAnswer", () => {
  it("returns null when answer is null", () => {
    const game = createGame();
    const gameState = createGameState();

    expect(handleInputAnswer({ answer: null, game, gameState })).toBeNull();
  });

  it("returns null when answer is a string (NavKey)", () => {
    const game = createGame();
    const gameState = createGameState();

    expect(
      handleInputAnswer({ answer: "q", game, gameState }),
    ).toBeNull();
  });

  it("calls makeMove with answer minus 1 in normal mode", () => {
    const game = createGame();
    const gameState = createGameState();

    handleInputAnswer({ answer: 3, game, gameState });

    expect(game.makeMove).toHaveBeenCalledWith(2);
  });

  it("does not call makeMove when keyHandler is running", () => {
    const game = createGame();
    const gameState = createGameState();
    const keyHandler = createKeyHandler(true);

    handleInputAnswer({ answer: 3, game, gameState, keyHandler });

    expect(game.makeMove).not.toHaveBeenCalled();
  });

  it("calls makeMove when keyHandler is not running", () => {
    const game = createGame();
    const gameState = createGameState();
    const keyHandler = createKeyHandler(false);

    handleInputAnswer({ answer: 5, game, gameState, keyHandler });

    expect(game.makeMove).toHaveBeenCalledWith(4);
  });

  it("calls backToMove and toggles history mode when in history mode", () => {
    const game = createGame();
    const gameState = createGameState({ historyMode: true });

    handleInputAnswer({ answer: 2, game, gameState });

    expect(game.backToMove).toHaveBeenCalledWith(2);
    expect(gameState.toggleHistoryMode).toHaveBeenCalled();
  });

  it("does not call backToMove in normal mode", () => {
    const game = createGame();
    const gameState = createGameState({ historyMode: false });

    handleInputAnswer({ answer: 2, game, gameState });

    expect(game.backToMove).not.toHaveBeenCalled();
  });

  it("uses gameStateManager default when gameState is not provided", () => {
    const game = createGame();

    const result = handleInputAnswer({ answer: 3, game });

    expect(result).toBeNull();
    expect(game.makeMove).toHaveBeenCalledWith(2);
  });
});
