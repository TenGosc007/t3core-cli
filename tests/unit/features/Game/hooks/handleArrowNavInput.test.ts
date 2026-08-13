import type { UIState } from "@/features/Game/reducers/gameReducer";

import { describe, expect, it, vi } from "vitest";

import {
  handleArrowNavInput,
  handleBoardNav,
  handleHistoryNav,
  handleInteractionKeys,
} from "@/features/Game/hooks/useArrowNavInput/handleArrowNavInput";

import { makeKey } from "../../../helpers/makeKey";

const makeCommands = () => ({
  toggleInfo: vi.fn(),
  toggleHistory: vi.fn(),
  navigateHistory: vi.fn(),
  backToMove: vi.fn(),
  navigate: vi.fn(),
  makeMove: vi.fn(),
});

const makeUi = (overrides: Partial<UIState> = {}): UIState => ({
  selectedCell: 4,
  showInfo: false,
  historyMode: false,
  inputError: null,
  historySelectedIndex: 2,
  ...overrides,
});

describe("handleInteractionKeys", () => {
  it("toggles info on 'i'", () => {
    const commands = makeCommands();
    handleInteractionKeys("i", commands);
    expect(commands.toggleInfo).toHaveBeenCalledTimes(1);
    expect(commands.toggleHistory).not.toHaveBeenCalled();
  });

  it("toggles history on 'h'", () => {
    const commands = makeCommands();
    handleInteractionKeys("h", commands);
    expect(commands.toggleHistory).toHaveBeenCalledTimes(1);
    expect(commands.toggleInfo).not.toHaveBeenCalled();
  });

  it("does nothing on other input", () => {
    const commands = makeCommands();
    handleInteractionKeys("x", commands);
    expect(commands.toggleInfo).not.toHaveBeenCalled();
    expect(commands.toggleHistory).not.toHaveBeenCalled();
  });
});

describe("handleHistoryNav", () => {
  it("navigates history up on upArrow", () => {
    const commands = makeCommands();
    handleHistoryNav("", makeKey({ upArrow: true }), makeUi(), commands);
    expect(commands.navigateHistory).toHaveBeenCalledWith("up");
    expect(commands.backToMove).not.toHaveBeenCalled();
  });

  it("navigates history down on downArrow", () => {
    const commands = makeCommands();
    handleHistoryNav("", makeKey({ downArrow: true }), makeUi(), commands);
    expect(commands.navigateHistory).toHaveBeenCalledWith("down");
  });

  it("rolls back to selected index on Enter", () => {
    const commands = makeCommands();
    const ui = makeUi({ historySelectedIndex: 3 });
    handleHistoryNav("", makeKey({ return: true }), ui, commands);
    expect(commands.backToMove).toHaveBeenCalledWith(3);
  });

  it("rolls back to selected index on space", () => {
    const commands = makeCommands();
    handleHistoryNav(" ", makeKey(), makeUi(), commands);
    expect(commands.backToMove).toHaveBeenCalledWith(2);
  });

  it("does nothing on other keys", () => {
    const commands = makeCommands();
    handleHistoryNav("x", makeKey(), makeUi(), commands);
    expect(commands.navigateHistory).not.toHaveBeenCalled();
    expect(commands.backToMove).not.toHaveBeenCalled();
  });
});

describe("handleBoardNav", () => {
  it.each([
    ["up", { upArrow: true }],
    ["down", { downArrow: true }],
    ["left", { leftArrow: true }],
    ["right", { rightArrow: true }],
  ] as const)("navigates %s on arrow key", (direction, overrides) => {
    const commands = makeCommands();
    handleBoardNav("", makeKey(overrides), makeUi(), commands);
    expect(commands.navigate).toHaveBeenCalledWith(direction);
  });

  it("makes a move on Enter at selectedCell", () => {
    const commands = makeCommands();
    const ui = makeUi({ selectedCell: 5 });
    handleBoardNav("", makeKey({ return: true }), ui, commands);
    expect(commands.makeMove).toHaveBeenCalledWith(5);
  });

  it("makes a move on space at selectedCell", () => {
    const commands = makeCommands();
    handleBoardNav(" ", makeKey(), makeUi({ selectedCell: 7 }), commands);
    expect(commands.makeMove).toHaveBeenCalledWith(7);
  });

  it("does nothing on other keys", () => {
    const commands = makeCommands();
    handleBoardNav("x", makeKey(), makeUi(), commands);
    expect(commands.navigate).not.toHaveBeenCalled();
    expect(commands.makeMove).not.toHaveBeenCalled();
  });
});

describe("handleArrowNavInput", () => {
  it("delegates to history nav when historyMode is on", () => {
    const commands = makeCommands();
    const ui = makeUi({ historyMode: true, historySelectedIndex: 1 });
    handleArrowNavInput("", makeKey({ upArrow: true }), ui, commands);
    expect(commands.navigateHistory).toHaveBeenCalledWith("up");
    expect(commands.navigate).not.toHaveBeenCalled();
  });

  it("delegates to board nav when historyMode is off", () => {
    const commands = makeCommands();
    const ui = makeUi({ historyMode: false, selectedCell: 4 });
    handleArrowNavInput("", makeKey({ upArrow: true }), ui, commands);
    expect(commands.navigate).toHaveBeenCalledWith("up");
    expect(commands.navigateHistory).not.toHaveBeenCalled();
  });

  it("still handles interaction keys in history mode", () => {
    const commands = makeCommands();
    handleArrowNavInput(
      "i",
      makeKey(),
      makeUi({ historyMode: true }),
      commands,
    );
    expect(commands.toggleInfo).toHaveBeenCalledTimes(1);
  });

  it("still handles interaction keys in board mode", () => {
    const commands = makeCommands();
    handleArrowNavInput(
      "h",
      makeKey(),
      makeUi({ historyMode: false }),
      commands,
    );
    expect(commands.toggleHistory).toHaveBeenCalledTimes(1);
  });
});
