import type { GameEngine, GameManager } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { describe, expect, it, vi } from "vitest";

import { NAV_KEYS } from "@/global/navigationKeys";

vi.mock("@/services/inputService", () => ({
  waitForInput: vi.fn(),
}));

import { getInputAnswer } from "@/features/game/components/InputEntry/utils/getInputAnswer";
import { waitForInput } from "@/services/inputService";

const createGame = (): GameEngine =>
  ({
    makeMove: vi.fn(),
    backToMove: vi.fn(),
    getMovesCount: vi.fn().mockReturnValue(0),
    getBoard: vi.fn().mockReturnValue(
      Array(9)
        .fill(null)
        .map((_, i) => i + 1),
    ),
    getStatus: vi.fn().mockReturnValue({ status: "running" }),
    isFieldOccupied: vi.fn().mockReturnValue(false),
    isGameOver: vi.fn().mockReturnValue(false),
    reset: vi.fn(),
    getCurrentPlayer: vi.fn().mockReturnValue("O"),
  }) as unknown as GameEngine;

const createManager = (game: GameEngine): GameManager =>
  ({
    getGame: vi.fn().mockReturnValue(game),
    reset: vi.fn(),
    createNew: vi.fn(),
  }) as unknown as GameManager;

const createGameState = (
  overrides: Partial<GameStateManager> = {},
): GameStateManager =>
  ({
    historyMode: false,
    info: false,
    inputError: null,
    toggleHistoryMode: vi.fn(),
    toggleInfo: vi.fn(),
    setInputError: vi.fn(),
    reset: vi.fn(),
    ...overrides,
  }) as unknown as GameStateManager;

describe("getInputAnswer", () => {
  const setup = () => {
    const game = createGame();
    const manager = createManager(game);
    const gameState = createGameState();
    return { game, manager, gameState };
  };

  it("returns quit key when user types q", async () => {
    vi.mocked(waitForInput).mockResolvedValue(NAV_KEYS.Q);
    const result = await getInputAnswer(setup());
    expect(result).toBe(NAV_KEYS.Q);
  });

  it("returns validated number or null for numeric input", async () => {
    vi.mocked(waitForInput).mockResolvedValue("1");
    const result = await getInputAnswer(setup());
    expect(typeof result === "number" || result === null).toBe(true);
  });

  it("returns null for invalid input", async () => {
    vi.mocked(waitForInput).mockResolvedValue("abc");
    const result = await getInputAnswer(setup());
    expect(result).toBeNull();
  });
});
