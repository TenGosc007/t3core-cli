import { describe, expect, it } from "vitest";

import {
  backspaceAtCursor,
  deleteAtCursor,
  handleTextInputInput,
  insertAtCursor,
  moveLeft,
  moveRight,
} from "@/components/TextInput/handleTextInputInput";

import { makeKey } from "../../helpers/makeKey";

describe("moveLeft", () => {
  it("decrements cursor", () => {
    expect(moveLeft(3)).toBe(2);
  });

  it("stops at 0", () => {
    expect(moveLeft(0)).toBe(0);
  });
});

describe("moveRight", () => {
  it("increments cursor", () => {
    expect(moveRight(2, 5)).toBe(3);
  });

  it("stops at value length", () => {
    expect(moveRight(5, 5)).toBe(5);
  });
});

describe("deleteAtCursor", () => {
  it("removes char at cursor position", () => {
    expect(deleteAtCursor("hello", 1)).toEqual({ value: "hllo", cursor: 1 });
  });

  it("removes last char", () => {
    expect(deleteAtCursor("abc", 2)).toEqual({ value: "ab", cursor: 2 });
  });

  it("handles cursor at end with no char after", () => {
    expect(deleteAtCursor("abc", 3)).toEqual({ value: "abc", cursor: 3 });
  });
});

describe("backspaceAtCursor", () => {
  it("removes char before cursor and moves cursor back", () => {
    expect(backspaceAtCursor("hello", 2)).toEqual({
      value: "hllo",
      cursor: 1,
    });
  });

  it("returns null when cursor is at 0", () => {
    expect(backspaceAtCursor("hello", 0)).toBeNull();
  });

  it("removes first char", () => {
    expect(backspaceAtCursor("abc", 1)).toEqual({ value: "bc", cursor: 0 });
  });
});

describe("insertAtCursor", () => {
  it("inserts char at cursor and advances cursor", () => {
    expect(insertAtCursor("abc", 1, "X")).toEqual({
      value: "aXbc",
      cursor: 2,
    });
  });

  it("inserts at beginning", () => {
    expect(insertAtCursor("abc", 0, "X")).toEqual({
      value: "Xabc",
      cursor: 1,
    });
  });

  it("inserts at end", () => {
    expect(insertAtCursor("abc", 3, "X")).toEqual({
      value: "abcX",
      cursor: 4,
    });
  });

  it("inserts multi-char string", () => {
    expect(insertAtCursor("abc", 1, "XY")).toEqual({
      value: "aXYbc",
      cursor: 3,
    });
  });
});

describe("handleTextInputInput", () => {
  it("returns submit on Enter", () => {
    const result = handleTextInputInput("", makeKey({ return: true }), {
      value: "abc",
      cursor: 3,
    });
    expect(result).toEqual({ type: "submit" });
  });

  it("moves cursor left on leftArrow", () => {
    const result = handleTextInputInput("", makeKey({ leftArrow: true }), {
      value: "abc",
      cursor: 2,
    });
    expect(result).toEqual({
      type: "update",
      state: { value: "abc", cursor: 1 },
    });
  });

  it("moves cursor right on rightArrow", () => {
    const result = handleTextInputInput("", makeKey({ rightArrow: true }), {
      value: "abc",
      cursor: 1,
    });
    expect(result).toEqual({
      type: "update",
      state: { value: "abc", cursor: 2 },
    });
  });

  it("deletes char on delete key", () => {
    const result = handleTextInputInput("", makeKey({ delete: true }), {
      value: "abc",
      cursor: 1,
    });
    expect(result).toEqual({
      type: "update",
      state: { value: "ac", cursor: 1 },
    });
  });

  it("backspaces char before cursor", () => {
    const result = handleTextInputInput("", makeKey({ backspace: true }), {
      value: "abc",
      cursor: 2,
    });
    expect(result).toEqual({
      type: "update",
      state: { value: "ac", cursor: 1 },
    });
  });

  it("returns noop when backspacing at cursor 0", () => {
    const result = handleTextInputInput("", makeKey({ backspace: true }), {
      value: "abc",
      cursor: 0,
    });
    expect(result).toEqual({ type: "noop" });
  });

  it("inserts a regular character", () => {
    const result = handleTextInputInput("X", makeKey(), {
      value: "abc",
      cursor: 1,
    });
    expect(result).toEqual({
      type: "update",
      state: { value: "aXbc", cursor: 2 },
    });
  });

  it("returns noop on ctrl+char", () => {
    const result = handleTextInputInput("a", makeKey({ ctrl: true }), {
      value: "abc",
      cursor: 1,
    });
    expect(result).toEqual({ type: "noop" });
  });

  it("returns noop on meta+char", () => {
    const result = handleTextInputInput("a", makeKey({ meta: true }), {
      value: "abc",
      cursor: 1,
    });
    expect(result).toEqual({ type: "noop" });
  });

  it("returns noop on empty input with no special key", () => {
    const result = handleTextInputInput("", makeKey(), {
      value: "abc",
      cursor: 1,
    });
    expect(result).toEqual({ type: "noop" });
  });
});
