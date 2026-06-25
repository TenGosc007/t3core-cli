import { beforeEach, describe, expect, it, vi } from "vitest";

import { GameHeaderUI } from "@/features/game/components/ui/GameHeaderUI/GameHeaderUI";

describe("GameHeaderUI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without throwing", () => {
    expect(() => GameHeaderUI()).not.toThrow();
  });

  it("logs GAME label", () => {
    GameHeaderUI();
    const calls = vi.mocked(console.log).mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes("GAME"))).toBe(true);
  });
});
