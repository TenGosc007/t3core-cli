import { describe, expect, it } from "vitest";

import { GameManager } from "@/features/game/engine/gameManager";

describe("GameManager", () => {
  it("getGame returns a game engine instance", () => {
    const manager = new GameManager();
    expect(manager.getGame()).toBeDefined();
    expect(typeof manager.getGame().getMovesCount).toBe("function");
  });

  it("reset delegates to the underlying game", () => {
    const manager = new GameManager();
    manager.getGame().makeMove(0);
    manager.reset();
    expect(manager.getGame().getMovesCount()).toBe(0);
  });

  it("createNew replaces the game with a fresh instance", () => {
    const manager = new GameManager();
    const original = manager.getGame();
    original.makeMove(0);
    manager.createNew();
    expect(manager.getGame()).not.toBe(original);
    expect(manager.getGame().getMovesCount()).toBe(0);
  });
});
