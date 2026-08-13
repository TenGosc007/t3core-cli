import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createInitialUIState,
  uiReducer,
  type UIState,
} from "@/features/Game/reducers/gameReducer";

vi.mock("@/services/settings", () => ({
  getArrowNavState: () => true,
}));

describe("gameReducer", () => {
  let initial: UIState;

  beforeEach(() => {
    initial = createInitialUIState();
  });

  it("createInitialUIState returns correct defaults", () => {
    expect(initial).toEqual({
      selectedCell: 4,
      showInfo: false,
      historyMode: false,
      inputError: null,
      historySelectedIndex: 0,
    });
  });

  it("NAVIGATE moves selectedCell and clears error", () => {
    const state: UIState = { ...initial, inputError: "err" };
    const next = uiReducer(state, { type: "NAVIGATE", direction: "up" });
    expect(next.selectedCell).toBe(1);
    expect(next.inputError).toBeNull();
  });

  it("TOGGLE_INFO flips showInfo and clears error", () => {
    const next = uiReducer(
      { ...initial, inputError: "err" },
      { type: "TOGGLE_INFO" },
    );
    expect(next.showInfo).toBe(true);
    expect(next.inputError).toBeNull();
  });

  it("TOGGLE_HISTORY flips historyMode and resets index", () => {
    const state: UIState = { ...initial, historySelectedIndex: 3 };
    const next = uiReducer(state, { type: "TOGGLE_HISTORY" });
    expect(next.historyMode).toBe(true);
    expect(next.historySelectedIndex).toBe(0);
    expect(next.inputError).toBeNull();
  });

  it("NAVIGATE_HISTORY up wraps around", () => {
    const state: UIState = { ...initial, historySelectedIndex: 0 };
    const next = uiReducer(state, {
      type: "NAVIGATE_HISTORY",
      direction: "up",
      count: 3,
    });
    expect(next.historySelectedIndex).toBe(2);
  });

  it("NAVIGATE_HISTORY down increments", () => {
    const state: UIState = { ...initial, historySelectedIndex: 1 };
    const next = uiReducer(state, {
      type: "NAVIGATE_HISTORY",
      direction: "down",
      count: 3,
    });
    expect(next.historySelectedIndex).toBe(2);
  });

  it("NAVIGATE_HISTORY down wraps around", () => {
    const state: UIState = { ...initial, historySelectedIndex: 2 };
    const next = uiReducer(state, {
      type: "NAVIGATE_HISTORY",
      direction: "down",
      count: 3,
    });
    expect(next.historySelectedIndex).toBe(0);
  });

  it("SET_ERROR sets inputError", () => {
    const next = uiReducer(initial, { type: "SET_ERROR", error: "bad" });
    expect(next.inputError).toBe("bad");
  });

  it("RESET returns initial state", () => {
    const state: UIState = {
      ...initial,
      historyMode: true,
      inputError: "err",
      selectedCell: 0,
    };
    const next = uiReducer(state, { type: "RESET" });
    expect(next).toEqual(createInitialUIState());
  });

  it("unknown action returns state unchanged", () => {
    const next = uiReducer(initial, { type: "UNKNOWN" } as never);
    expect(next).toBe(initial);
  });
});
