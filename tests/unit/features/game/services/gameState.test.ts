import { describe, expect, it } from "vitest";

import { GameStateManager } from "@/features/game/services/gameState";

describe("GameStateManager", () => {
  it("initialises with default state", () => {
    const state = new GameStateManager();
    expect(state.info).toBe(false);
    expect(state.historyMode).toBe(false);
    expect(state.inputError).toBeNull();
  });

  it("accepts partial initial state", () => {
    const state = new GameStateManager({ historyMode: true });
    expect(state.historyMode).toBe(true);
    expect(state.info).toBe(false);
  });

  it("toggleInfo flips info and clears inputError", () => {
    const state = new GameStateManager();
    state.setInputError("some error");
    state.toggleInfo();
    expect(state.info).toBe(true);
    expect(state.inputError).toBeNull();
    state.toggleInfo();
    expect(state.info).toBe(false);
  });

  it("toggleHistoryMode flips historyMode and clears inputError", () => {
    const state = new GameStateManager();
    state.setInputError("err");
    state.toggleHistoryMode();
    expect(state.historyMode).toBe(true);
    expect(state.inputError).toBeNull();
    state.toggleHistoryMode();
    expect(state.historyMode).toBe(false);
  });

  it("setInputError stores the error", () => {
    const state = new GameStateManager();
    state.setInputError("bad input");
    expect(state.inputError).toBe("bad input");
  });

  it("reset restores default state", () => {
    const state = new GameStateManager({ info: true, historyMode: true });
    state.setInputError("err");
    state.reset();
    expect(state.info).toBe(false);
    expect(state.historyMode).toBe(false);
    expect(state.inputError).toBeNull();
  });
});
