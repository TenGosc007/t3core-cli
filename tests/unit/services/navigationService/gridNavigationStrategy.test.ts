import { describe, expect, it } from "vitest";

import { NAV_KEYS } from "@/global/navigationKeys";
import { GridNavigationStrategy } from "@/services/navigationService/strategies/gridNavigationStrategy";

describe("GridNavigationStrategy", () => {
  const strategy = new GridNavigationStrategy(3, 3);

  it("moves up from middle row", () => {
    expect(strategy.move(4, NAV_KEYS.UP)).toBe(1);
  });

  it("wraps up from top row to bottom", () => {
    expect(strategy.move(1, NAV_KEYS.UP)).toBe(7);
  });

  it("moves down from middle row", () => {
    expect(strategy.move(4, NAV_KEYS.DOWN)).toBe(7);
  });

  it("wraps down from bottom row to top", () => {
    expect(strategy.move(7, NAV_KEYS.DOWN)).toBe(1);
  });

  it("moves right", () => {
    expect(strategy.move(0, NAV_KEYS.RIGHT)).toBe(1);
  });

  it("wraps right from last column", () => {
    expect(strategy.move(2, NAV_KEYS.RIGHT)).toBe(0);
  });

  it("moves left", () => {
    expect(strategy.move(1, NAV_KEYS.LEFT)).toBe(0);
  });

  it("wraps left from first column", () => {
    expect(strategy.move(0, NAV_KEYS.LEFT)).toBe(2);
  });

  it("returns same position for unhandled key", () => {
    expect(strategy.move(4, NAV_KEYS.Q)).toBe(4);
  });
});
