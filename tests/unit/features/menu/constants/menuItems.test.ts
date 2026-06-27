import { describe, expect, it } from "vitest";

import { MENU_ITEMS } from "@/features/menu/constants/menuItems";
import { ROUTES } from "@/navigation/routes";

describe("MENU_ITEMS", () => {
  it("contains the expected menu items", () => {
    expect(MENU_ITEMS).toHaveLength(3);
    expect(MENU_ITEMS[0]).toEqual({ id: "1", label: "New Game", route: ROUTES.GAME });
    expect(MENU_ITEMS[1]).toEqual({ id: "2", label: "Settings", route: ROUTES.SETTINGS });
    expect(MENU_ITEMS[2]).toEqual({ id: "3", label: "Exit", route: "exit" });
  });
});
