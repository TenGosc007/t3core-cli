import { beforeEach, describe, expect, it, vi } from "vitest";

import { GameHintUI } from "@/features/game/components/ui/GameHintUI/GameHintUI";

describe("GameHintUI", () => {
  const getCalls = () =>
    vi.mocked(console.log).mock.calls.map((c) => String(c[0]));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows number selection instruction when no arrow keys and not history mode", () => {
    GameHintUI({
      movesCount: 0,
      isKeyHandlerRunning: false,
      isHistoryMode: false,
    });
    expect(getCalls().some((c) => c.includes("1-9"))).toBe(true);
  });

  it("shows arrow key instruction when key handler is running and not history mode", () => {
    GameHintUI({
      movesCount: 3,
      isKeyHandlerRunning: true,
      isHistoryMode: false,
    });
    expect(getCalls().some((c) => c.includes("arrow"))).toBe(true);
  });

  it("shows history instruction in history mode without arrow keys", () => {
    GameHintUI({
      movesCount: 3,
      isKeyHandlerRunning: false,
      isHistoryMode: true,
    });
    expect(getCalls().some((c) => c.includes("previous move"))).toBe(true);
  });

  it("shows text input history instruction in history mode with arrow keys running", () => {
    GameHintUI({
      movesCount: 3,
      isKeyHandlerRunning: true,
      isHistoryMode: true,
    });
    expect(getCalls().some((c) => c.includes("previous move"))).toBe(true);
  });

  it("shows history hint when moves > 0", () => {
    GameHintUI({
      movesCount: 2,
      isKeyHandlerRunning: false,
      isHistoryMode: false,
    });
    expect(getCalls().some((c) => c.includes("history"))).toBe(true);
  });

  it("does not show history hint when no moves", () => {
    GameHintUI({
      movesCount: 0,
      isKeyHandlerRunning: false,
      isHistoryMode: false,
    });
    expect(getCalls().some((c) => c.includes("to show game history"))).toBe(
      false,
    );
  });
});
