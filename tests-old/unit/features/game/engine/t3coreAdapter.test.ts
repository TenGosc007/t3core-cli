import { describe, expect, it } from "vitest";

import { T3CoreAdapter } from "@/features/game/engine/t3coreAdapter";

describe("T3CoreAdapter", () => {
  it("initialises with a running game", () => {
    const adapter = new T3CoreAdapter();
    expect(adapter.getStatus().status).toBe("running");
    expect(adapter.isGameOver()).toBe(false);
  });

  it("getBoard returns a 9-element array", () => {
    const adapter = new T3CoreAdapter();
    expect(adapter.getBoard()).toHaveLength(9);
  });

  it("getMovesCount starts at 0", () => {
    const adapter = new T3CoreAdapter();
    expect(adapter.getMovesCount()).toBe(0);
  });

  it("getCurrentPlayer returns a string", () => {
    const adapter = new T3CoreAdapter();
    expect(typeof adapter.getCurrentPlayer()).toBe("string");
  });

  it("makeMove returns true on valid move and increments moves", () => {
    const adapter = new T3CoreAdapter();
    const result = adapter.makeMove(0);
    expect(result).toBe(true);
    expect(adapter.getMovesCount()).toBe(1);
  });

  it("makeMove returns false on occupied field", () => {
    const adapter = new T3CoreAdapter();
    adapter.makeMove(0);
    const result = adapter.makeMove(0);
    expect(result).toBe(false);
  });

  it("isFieldOccupied returns true after move", () => {
    const adapter = new T3CoreAdapter();
    adapter.makeMove(0);
    expect(adapter.isFieldOccupied(0)).toBe(true);
  });

  it("isFieldOccupied returns false for empty field", () => {
    const adapter = new T3CoreAdapter();
    expect(adapter.isFieldOccupied(0)).toBe(false);
  });

  it("reset clears the game state", () => {
    const adapter = new T3CoreAdapter();
    adapter.makeMove(0);
    adapter.reset();
    expect(adapter.getMovesCount()).toBe(0);
    expect(adapter.isFieldOccupied(0)).toBe(false);
  });

  it("backToMove restores earlier game state", () => {
    const adapter = new T3CoreAdapter();
    adapter.makeMove(0);
    adapter.makeMove(1);
    adapter.makeMove(2);
    expect(adapter.isFieldOccupied(2)).toBe(true);
    adapter.backToMove(1);
    expect(adapter.isFieldOccupied(2)).toBe(false);
    expect(adapter.isFieldOccupied(0)).toBe(true);
  });

  it("isGameOver returns true when game is won", () => {
    const adapter = new T3CoreAdapter();
    adapter.makeMove(0);
    adapter.makeMove(3);
    adapter.makeMove(1);
    adapter.makeMove(4);
    adapter.makeMove(2);
    expect(adapter.isGameOver()).toBe(true);
  });
});
