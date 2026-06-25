import { afterEach, describe, expect, it, vi } from "vitest";

import { MenuOptions } from "@/features/menu/components/MenuOptions";
import { MENU_ITEMS } from "@/features/menu/constants/menuItems";

describe("MenuOptions", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("logs all menu items", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    MenuOptions();

    expect(logSpy).toHaveBeenCalledTimes(MENU_ITEMS.length);

    MENU_ITEMS.forEach((item) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(item.label));
    });
  });
});
