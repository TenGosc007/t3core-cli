import { describe, expect, it } from "vitest";

import { NAV_KEYS } from "@/global/navigationKeys";
import { normalizeReadlineKey } from "@/services/keyHandlerService/keyNormalizer";

describe("normalizeReadlineKey", () => {
  it("returns null for unknown key name", () => {
    expect(normalizeReadlineKey({ name: "z" })).toBeNull();
  });

  it("returns null when name is undefined", () => {
    expect(normalizeReadlineKey({})).toBeNull();
  });

  it("returns normalized key for known nav key", () => {
    const result = normalizeReadlineKey({ name: NAV_KEYS.UP });
    expect(result).not.toBeNull();
    expect(result?.name).toBe(NAV_KEYS.UP);
  });

  it("preserves extra key properties", () => {
    const result = normalizeReadlineKey({ name: NAV_KEYS.ENTER, ctrl: true });
    expect(result?.ctrl).toBe(true);
  });

  it("returns normalized key for q", () => {
    expect(normalizeReadlineKey({ name: NAV_KEYS.Q })?.name).toBe(NAV_KEYS.Q);
  });

  it("returns normalized key for escape", () => {
    expect(normalizeReadlineKey({ name: NAV_KEYS.ESCAPE })?.name).toBe(
      NAV_KEYS.ESCAPE,
    );
  });
});
