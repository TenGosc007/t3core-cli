import { describe, expect, it } from "vitest";

import { createGameEngine } from "@/features/Game/engine/gameEngine";

describe("gameEngine", () => {
  it("starts with running status", () => {
    const engine = createGameEngine();
    expect(engine.isRunning).toBe(true);
    expect(engine.gameStatus.status).toBe("running");
  });

  it("starts with empty board", () => {
    const engine = createGameEngine();
    expect(engine.board.every((f) => typeof f === "number")).toBe(true);
  });

  it("starts with 0 moves", () => {
    const engine = createGameEngine();
    expect(engine.movesCount).toBe(0);
  });

  it("savePlayerMove places a move and increments count", () => {
    const engine = createGameEngine();
    const result = engine.savePlayerMove(0);
    expect(result).toBe("success");
    expect(engine.movesCount).toBe(1);
    expect(engine.isFieldSelectedByIndex(0)).toBe(true);
  });

  it("savePlayerMove on occupied field returns already_selected", () => {
    const engine = createGameEngine();
    engine.savePlayerMove(0);
    const result = engine.savePlayerMove(0);
    expect(result).toBe("already_selected");
  });

  it("reset clears the board", () => {
    const engine = createGameEngine();
    engine.savePlayerMove(0);
    engine.savePlayerMove(1);
    engine.reset();
    expect(engine.movesCount).toBe(0);
    expect(engine.isFieldSelectedByIndex(0)).toBe(false);
  });

  it("backToMove returns success for valid index", () => {
    const engine = createGameEngine();
    engine.savePlayerMove(0);
    engine.savePlayerMove(1);
    const result = engine.backToMove(0);
    expect(result).toBe("success");
  });

  it("subscribe receives notifications on state change", () => {
    const engine = createGameEngine();
    let called = 0;
    const unsub = engine.subscribe(() => called++);
    engine.savePlayerMove(0);
    expect(called).toBeGreaterThan(0);
    unsub();
  });

  it("getSnapshot returns current snapshot", () => {
    const engine = createGameEngine();
    const snap = engine.getSnapshot();
    expect(snap).toBeDefined();
    expect(snap.board).toBeDefined();
  });
});
