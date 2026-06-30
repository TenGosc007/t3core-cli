import type { GameStatus } from "t3core";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { GameStatusMessageUI } from "@/features/game/components/ui/GameStatusMessageUI/GameStatusMessageUI";

describe("GameStatusMessageUI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logs nothing when game is running", () => {
    const gameStatus: GameStatus = { status: "running" };
    GameStatusMessageUI({ gameStatus });
    expect(console.log).not.toHaveBeenCalled();
  });

  it("logs draw message when game is a draw", () => {
    const gameStatus: GameStatus = { status: "draw" };
    GameStatusMessageUI({ gameStatus });
    expect(console.log).toHaveBeenCalledTimes(2);
    const call = vi.mocked(console.log).mock.calls[1][0] as string;
    expect(call).toContain("draw");
  });

  it("logs win message with winner when game is won", () => {
    const gameStatus: GameStatus = { status: "win", winner: "O" };
    GameStatusMessageUI({ gameStatus });
    const calls = vi.mocked(console.log).mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(2);
    const lastCall = calls[calls.length - 1][0] as string;
    expect(lastCall).toContain("wins");
    expect(lastCall).toContain("O");
  });

  it("throws for unknown status", () => {
    const gameStatus = { status: "unknown" } as unknown as GameStatus;
    expect(() => GameStatusMessageUI({ gameStatus })).toThrow();
  });
});
