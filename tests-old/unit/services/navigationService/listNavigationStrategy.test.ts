import { describe, expect, it } from "vitest";

import { NAV_KEYS } from "@/global/navigationKeys";
import { ListNavigationStrategy } from "@/services/navigationService/strategies/listNavigationStrategy";

describe("ListNavigationStrategy", () => {
  const strategy = new ListNavigationStrategy(0, 3);

  it("moves up", () => {
    expect(strategy.move(2, NAV_KEYS.UP)).toBe(1);
  });

  it("clamps at min boundary on up", () => {
    expect(strategy.move(0, NAV_KEYS.UP)).toBe(0);
  });

  it("moves down", () => {
    expect(strategy.move(1, NAV_KEYS.DOWN)).toBe(2);
  });

  it("clamps at max boundary on down", () => {
    expect(strategy.move(3, NAV_KEYS.DOWN)).toBe(3);
  });

  it("returns same position for unhandled key", () => {
    expect(strategy.move(2, NAV_KEYS.Q)).toBe(2);
  });
});
