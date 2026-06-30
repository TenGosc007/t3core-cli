import { beforeEach, describe, expect, it, vi } from "vitest";

import { PlayerPromptUI } from "@/features/game/components/ui/PlayerPromptUI/PlayerPromptUI";

describe("PlayerPromptUI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logs current player name", () => {
    PlayerPromptUI({ currentPlayer: "O" });
    const logged = vi.mocked(console.log).mock.calls.map((c) => String(c[0]));
    expect(logged.some((c) => c.includes("O"))).toBe(true);
  });

  it("renders three log lines", () => {
    PlayerPromptUI({ currentPlayer: "X" });
    expect(vi.mocked(console.log).mock.calls.length).toBe(3);
  });
});
