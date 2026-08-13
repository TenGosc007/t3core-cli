import type { Key } from "ink";

import { describe, expect, it } from "vitest";

import {
  handleMenuInput,
  wrapIndex,
} from "@/features/Menu/hooks/useMenuInput/handleMenuInput";
import { MENU_OPTIONS } from "@/features/Menu/constants/menuOptions";

const makeKey = (overrides: Partial<Key> = {}): Key =>
  ({
    upArrow: false,
    downArrow: false,
    leftArrow: false,
    rightArrow: false,
    pageDown: false,
    pageUp: false,
    home: false,
    end: false,
    return: false,
    escape: false,
    ctrl: false,
    shift: false,
    tab: false,
    backspace: false,
    delete: false,
    meta: false,
    ...overrides,
  }) as Key;

describe("wrapIndex", () => {
  it("increments on down", () => {
    expect(wrapIndex(0, 4, "down")).toBe(1);
  });

  it("wraps to 0 at end on down", () => {
    expect(wrapIndex(3, 4, "down")).toBe(0);
  });

  it("decrements on up", () => {
    expect(wrapIndex(2, 4, "up")).toBe(1);
  });

  it("wraps to last at 0 on up", () => {
    expect(wrapIndex(0, 4, "up")).toBe(3);
  });

  it("handles single item", () => {
    expect(wrapIndex(0, 1, "up")).toBe(0);
    expect(wrapIndex(0, 1, "down")).toBe(0);
  });
});

describe("handleMenuInput", () => {
  it("returns noop when inactive", () => {
    expect(handleMenuInput(makeKey({ upArrow: true }), false)).toEqual({
      type: "noop",
    });
  });

  it("returns navigate up on upArrow", () => {
    expect(handleMenuInput(makeKey({ upArrow: true }), true)).toEqual({
      type: "navigate",
      direction: "up",
    });
  });

  it("returns navigate down on downArrow", () => {
    expect(handleMenuInput(makeKey({ downArrow: true }), true)).toEqual({
      type: "navigate",
      direction: "down",
    });
  });

  it("returns select on Enter", () => {
    expect(handleMenuInput(makeKey({ return: true }), true)).toEqual({
      type: "select",
    });
  });

  it("returns noop on other keys", () => {
    expect(handleMenuInput(makeKey(), true)).toEqual({ type: "noop" });
  });

  it("returns noop on leftArrow", () => {
    expect(handleMenuInput(makeKey({ leftArrow: true }), true)).toEqual({
      type: "noop",
    });
  });
});

describe("MENU_OPTIONS length", () => {
  it("has 4 options", () => {
    expect(MENU_OPTIONS.length).toBe(4);
  });
});
