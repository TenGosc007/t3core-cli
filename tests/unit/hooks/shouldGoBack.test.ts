import { describe, expect, it } from "vitest";

import { shouldGoBack } from "@/hooks/useGoBack/shouldGoBack";

import { makeKey } from "../helpers/makeKey";

describe("shouldGoBack", () => {
  it("returns true on Escape", () => {
    expect(shouldGoBack("", makeKey({ escape: true }))).toBe(true);
  });

  it("returns true on 'q'", () => {
    expect(shouldGoBack("q", makeKey())).toBe(true);
  });

  it("returns false on other input", () => {
    expect(shouldGoBack("x", makeKey())).toBe(false);
  });

  it("returns true on special input", () => {
    expect(
      shouldGoBack("return", makeKey(), { specialInputs: ["return"] }),
    ).toBe(true);
  });

  it("returns true on special key", () => {
    expect(
      shouldGoBack("", makeKey({ return: true }), { specialKeys: ["return"] }),
    ).toBe(true);
  });

  it("returns false when special input doesn't match", () => {
    expect(shouldGoBack("x", makeKey(), { specialInputs: ["return"] })).toBe(
      false,
    );
  });

  it("returns false when special key doesn't match", () => {
    expect(shouldGoBack("", makeKey(), { specialKeys: ["return"] })).toBe(
      false,
    );
  });
});
