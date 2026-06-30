import { describe, expect, it, vi } from "vitest";

import { MenuEntry } from "@/features/menu/components/MenuEntry";
import { MENU_ITEMS } from "@/features/menu/constants/menuItems";
import { ROUTES } from "@/navigation/routes";
import { waitForInput } from "@/services/inputService";

vi.mock("@/services/inputService", () => ({
  waitForInput: vi.fn(),
}));

describe("MenuEntry", () => {
  it("returns the route for a valid menu choice", async () => {
    vi.mocked(waitForInput).mockResolvedValue(MENU_ITEMS[0].id);

    const result = await MenuEntry();

    expect(result).toBe(ROUTES.GAME);
  });

  it("returns MENU route for an invalid choice", async () => {
    vi.mocked(waitForInput).mockResolvedValue("invalid");

    const result = await MenuEntry();

    expect(result).toBe(ROUTES.MENU);
  });

  it("trims whitespace from the input", async () => {
    vi.mocked(waitForInput).mockResolvedValue(`  ${MENU_ITEMS[1].id}  `);

    const result = await MenuEntry();

    expect(result).toBe(ROUTES.SETTINGS);
  });
});
