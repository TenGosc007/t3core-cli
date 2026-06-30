import type { BoardField } from "t3core";

import { describe, expect, it } from "vitest";

import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";

describe("colorLabelSymbol", () => {
  it("returns styled number for numeric label", () => {
    const result = colorLabelSymbol(1);
    expect(result).toContain("1");
  });

  it("returns green bold for first player symbol (O)", () => {
    const result = colorLabelSymbol("O");
    expect(result).toContain("O");
  });

  it("returns red bold for second player symbol (X)", () => {
    const result = colorLabelSymbol("X");
    expect(result).toContain("X");
  });

  it("returns bold for unknown string symbol", () => {
    const result = colorLabelSymbol("?" as unknown as BoardField);
    expect(result).toContain("?");
  });
});
