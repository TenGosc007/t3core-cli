import { beforeEach, describe, expect, it, vi } from "vitest";

import { GameEntryMessageUI } from "@/features/game/components/ui/GameEntryMessageUI/GameEntryMessageUI";

describe("GameEntryMessageUI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getCalls = () =>
    vi.mocked(console.log).mock.calls.map((c) => String(c[0]));

  it("shows game info when showInfo is true", () => {
    GameEntryMessageUI({ showInfo: true });
    expect(getCalls().some((c) => c.includes("Tic-tac-toe"))).toBe(true);
  });

  it("shows hint to press i when showInfo is false", () => {
    GameEntryMessageUI({ showInfo: false });
    expect(getCalls().some((c) => c.includes("show game info"))).toBe(true);
  });

  it("always renders border", () => {
    GameEntryMessageUI({ showInfo: false });
    expect(vi.mocked(console.log).mock.calls.length).toBeGreaterThanOrEqual(3);
  });
});
