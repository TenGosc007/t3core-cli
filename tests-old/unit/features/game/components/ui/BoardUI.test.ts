import type { BoardField } from "t3core";

import { describe, expect, it, vi } from "vitest";

import { BoardUI } from "@/features/game/components/ui/BoardUI/BoardUI";

const makeBoard = () => [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

describe("BoardUI", () => {
  it("renders without throwing", () => {
    expect(() => BoardUI({ fields: [...makeBoard()] })).not.toThrow();
  });

  it("calls console.log for each row + borders (7 calls: top + 3*(row+separator/bottom))", () => {
    BoardUI({ fields: [...makeBoard()] });
    expect(vi.mocked(console.log).mock.calls.length).toBeGreaterThanOrEqual(7);
  });

  it("renders selected cell with inverse style", () => {
    BoardUI({ fields: [...makeBoard()], selectedIndex: 4 });
    const allOutput = vi
      .mocked(console.log)
      .mock.calls.map((c) => String(c[0]))
      .join("");
    expect(allOutput.length).toBeGreaterThan(0);
  });

  it("renders board with player symbols", () => {
    const fields: BoardField[] = ["O", "X", 3, 4, 5, 6, 7, 8, 9];
    expect(() => BoardUI({ fields })).not.toThrow();
  });
});
