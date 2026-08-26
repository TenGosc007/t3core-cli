import { describe, expect, it } from "vitest";

import { handleArrowNavInput, wrapIndex } from "@/utils/arrowNav";

import { makeKey } from "../helpers/makeKey";

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

describe("handleArrowNavInput", () => {
  it("returns noop when inactive", () => {
    expect(handleArrowNavInput(makeKey({ upArrow: true }), false)).toEqual({
      type: "noop",
    });
  });

  it("returns navigate up on upArrow", () => {
    expect(handleArrowNavInput(makeKey({ upArrow: true }), true)).toEqual({
      type: "navigate",
      direction: "up",
    });
  });

  it("returns navigate down on downArrow", () => {
    expect(handleArrowNavInput(makeKey({ downArrow: true }), true)).toEqual({
      type: "navigate",
      direction: "down",
    });
  });

  it("returns select on Enter", () => {
    expect(handleArrowNavInput(makeKey({ return: true }), true)).toEqual({
      type: "select",
    });
  });

  it("returns noop on other keys", () => {
    expect(handleArrowNavInput(makeKey(), true)).toEqual({ type: "noop" });
  });

  it("returns noop on leftArrow", () => {
    expect(handleArrowNavInput(makeKey({ leftArrow: true }), true)).toEqual({
      type: "noop",
    });
  });
});
