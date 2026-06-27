import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { describe, expect, it, vi } from "vitest";

import { NAV_KEYS } from "@/global/navigationKeys";

vi.mock("@/features/game/components/InputEntry/utils/getInputAnswer", () => ({
  getInputAnswer: vi.fn(),
}));

import { InputEntry } from "@/features/game/components/InputEntry/InputEntry";
import { getInputAnswer } from "@/features/game/components/InputEntry/utils/getInputAnswer";

const createGame = (): GameEngine =>
  ({
    makeMove: vi.fn(),
    backToMove: vi.fn(),
    getMovesCount: vi.fn().mockReturnValue(0),
    getStatus: vi.fn().mockReturnValue({ status: "running" }),
    isFieldOccupied: vi.fn().mockReturnValue(false),
    isGameOver: vi.fn().mockReturnValue(false),
    reset: vi.fn(),
    getCurrentPlayer: vi.fn().mockReturnValue("O"),
    getBoard: vi.fn().mockReturnValue([]),
  }) as unknown as GameEngine;

const createGameState = (): GameStateManager =>
  ({
    historyMode: false,
    info: false,
    inputError: null,
    toggleHistoryMode: vi.fn(),
    toggleInfo: vi.fn(),
    setInputError: vi.fn(),
    reset: vi.fn(),
  }) as unknown as GameStateManager;

describe("InputEntry", () => {
  it("returns Q immediately when getInputAnswer returns Q", async () => {
    vi.mocked(getInputAnswer).mockResolvedValue(NAV_KEYS.Q);
    const result = await InputEntry({ game: createGame(), gameState: createGameState() });
    expect(result).toBe(NAV_KEYS.Q);
  });

  it("passes numeric answer to handleInputAnswer", async () => {
    vi.mocked(getInputAnswer).mockResolvedValue(3);
    const game = createGame();
    const gameState = createGameState();
    await InputEntry({ game, gameState });
    expect(game.makeMove).toHaveBeenCalledWith(2);
  });

  it("returns null when getInputAnswer returns null", async () => {
    vi.mocked(getInputAnswer).mockResolvedValue(null);
    const result = await InputEntry({ game: createGame(), gameState: createGameState() });
    expect(result).toBeNull();
  });
});
