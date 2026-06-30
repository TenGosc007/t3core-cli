import type { GameEngine } from "@/features/game/engine";

import { describe, expect, it, vi } from "vitest";

import { playAgain } from "@/features/game/util/playAgain";

vi.mock("@/services/inputService", () => ({
  waitForInput: vi.fn().mockResolvedValue(""),
}));

const createGame = (isOver: boolean): GameEngine =>
  ({
    isGameOver: vi.fn().mockReturnValue(isOver),
    reset: vi.fn(),
  }) as unknown as GameEngine;

describe("playAgain", () => {
  it("returns false and does not reset when game is not over", async () => {
    const game = createGame(false);
    const result = await playAgain({ game });
    expect(result).toBe(false);
    expect(game.reset).not.toHaveBeenCalled();
  });

  it("returns true and resets game when game is over", async () => {
    const game = createGame(true);
    const result = await playAgain({ game });
    expect(result).toBe(true);
    expect(game.reset).toHaveBeenCalled();
  });
});
