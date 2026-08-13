import { describe, expect, it } from "vitest";

import { getRenderSegments } from "@/components/TextInput/getRenderSegments";

describe("getRenderSegments", () => {
  it("splits value at cursor position", () => {
    const result = getRenderSegments("hello", 2, "");
    expect(result).toEqual({
      before: "he",
      cursorChar: "l",
      after: "lo",
      isPlaceholder: false,
    });
  });

  it("uses space when cursor is at end", () => {
    const result = getRenderSegments("abc", 3, "");
    expect(result.cursorChar).toBe(" ");
    expect(result.after).toBe("");
  });

  it("shows placeholder in after when value is empty", () => {
    const result = getRenderSegments("", 0, "Type here");
    expect(result).toEqual({
      before: "",
      cursorChar: " ",
      after: "Type here",
      isPlaceholder: true,
    });
  });

  it("marks isPlaceholder true when value is empty", () => {
    const result = getRenderSegments("", 0, "placeholder");
    expect(result.isPlaceholder).toBe(true);
  });

  it("marks isPlaceholder false when value exists", () => {
    const result = getRenderSegments("abc", 0, "placeholder");
    expect(result.isPlaceholder).toBe(false);
  });

  it("handles single char value with cursor at 0", () => {
    const result = getRenderSegments("a", 0, "");
    expect(result).toEqual({
      before: "",
      cursorChar: "a",
      after: "",
      isPlaceholder: false,
    });
  });

  it("handles single char value with cursor at 1", () => {
    const result = getRenderSegments("a", 1, "");
    expect(result).toEqual({
      before: "a",
      cursorChar: " ",
      after: "",
      isPlaceholder: false,
    });
  });
});
