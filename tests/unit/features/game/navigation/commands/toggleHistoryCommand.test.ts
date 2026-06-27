import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { describe, expect, it, vi } from "vitest";

import { ToggleHistoryCommand } from "@/features/game/navigation/commands/toggleHistoryCommand";
import { NAV_KEYS } from "@/global/navigationKeys";

const createGame = (movesCount: number) => {
  return {
    getMovesCount: vi.fn().mockReturnValue(movesCount),
  } as unknown as GameEngine;
};

const createGameState = () => {
  return {
    toggleHistoryMode: vi.fn(),
    historyMode: false,
  } as unknown as GameStateManager;
};

describe("ToggleHistoryCommand", () => {
  it("handles only h key", () => {
    const command = new ToggleHistoryCommand(createGame(1), createGameState());

    expect(command.canHandle(NAV_KEYS.H)).toBe(true);
    expect(command.canHandle(NAV_KEYS.I)).toBe(false);
  });

  it("toggles history mode when there are moves", () => {
    const game = createGame(3);
    const gameState = createGameState();
    const command = new ToggleHistoryCommand(game, gameState);

    expect(command.execute()).toBe(NAV_KEYS.H);
    expect(gameState.toggleHistoryMode).toHaveBeenCalled();
  });

  it("does not toggle history mode when there are no moves", () => {
    const game = createGame(0);
    const gameState = createGameState();
    const command = new ToggleHistoryCommand(game, gameState);

    expect(command.execute()).toBe(NAV_KEYS.H);
    expect(gameState.toggleHistoryMode).not.toHaveBeenCalled();
  });
});
